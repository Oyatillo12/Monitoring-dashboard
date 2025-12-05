import { CaptureSpiritResponseSchema } from "@/shared/lib/zod/schemas";

export async function captureSpirit(id: string): Promise<{
  success: boolean;
  message?: string;
}> {
  const response = await fetch(`/api/spirits/${id}/capture`, {
    method: "PATCH",
  });

  const data = await response.json();
  const validated = CaptureSpiritResponseSchema.parse(data);

  if (!response.ok) {
    throw new Error(validated.message || "Failed to capture spirit");
  }

  return validated;
}

