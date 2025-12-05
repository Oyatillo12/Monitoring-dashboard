import { NextRequest } from "next/server";
import { getSpiritsStore, updateSpirit } from "@/shared/api/spirits-store";
import { SpiritUpdateEventSchema } from "@/shared/lib/zod/schemas";

const threatLevels: Array<"Low" | "Medium" | "High" | "Critical"> = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

function getRandomThreatLevel(): "Low" | "Medium" | "High" | "Critical" {
  return threatLevels[Math.floor(Math.random() * threatLevels.length)] as
    | "Low"
    | "Medium"
    | "High"
    | "Critical";
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(`: connected\n\n`));

      const interval = setInterval(() => {
        try {
          const spirits = getSpiritsStore();
          const activeSpirits = spirits.filter((s) => s.status === "Active");

          if (activeSpirits.length === 0) {
            return;
          }

          const randomSpirit =
            activeSpirits[Math.floor(Math.random() * activeSpirits.length)];

          const newThreatLevel = getRandomThreatLevel();

          updateSpirit(randomSpirit.id, { threatLevel: newThreatLevel });

          const eventData = SpiritUpdateEventSchema.parse({
            id: randomSpirit.id,
            threatLevel: newThreatLevel,
          });

          const message = `event: update\ndata: ${JSON.stringify(
            eventData
          )}\n\n`;
          controller.enqueue(encoder.encode(message));
        } catch (error) {
          console.error("Error in SSE stream:", error);
          clearInterval(interval);
          controller.close();
        }
      }, 5000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
