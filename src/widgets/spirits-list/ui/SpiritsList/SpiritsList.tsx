"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSpiritsQuery } from "@/entities/spirit/model/useSpiritsQuery";
import { SpiritCard } from "@/entities/spirit/ui/SpiritCard";
import { CaptureButton } from "@/features/capture-spirit/ui/CaptureButton";
import { Spirit, SpiritUpdateEventSchema } from "@/shared/lib/zod/schemas";
import styles from "./SpiritsList.module.scss";

export function SpiritsList() {
  const { data: spirits, isLoading, error } = useSpiritsQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource("/api/spirits/events");

    eventSource.addEventListener("update", (event) => {
      try {
        const eventData = JSON.parse(event.data);
        const validated = SpiritUpdateEventSchema.parse(eventData);

        queryClient.setQueryData<Spirit[]>(["spirits"], (old) => {
          if (!old) return old;
          return old.map((spirit: Spirit) =>
            spirit.id === validated.id
              ? { ...spirit, threatLevel: validated.threatLevel }
              : spirit
          );
        });
      } catch (error) {
        console.error("Error parsing SSE event:", error);
      }
    });

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading spirits...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          Error loading spirits:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    );
  }

  if (!spirits || spirits.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No spirits found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {spirits.map((spirit) => (
          <SpiritCard key={spirit.id} spirit={spirit}>
            {spirit.status === "Active" && (
              <CaptureButton spiritId={spirit.id} />
            )}
          </SpiritCard>
        ))}
      </div>
    </div>
  );
}
