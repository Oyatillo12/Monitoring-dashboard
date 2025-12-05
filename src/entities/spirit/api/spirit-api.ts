import { SpiritsResponseSchema, type Spirit } from "@/shared/lib/zod/schemas";

export async function fetchSpirits(): Promise<Spirit[]> {
  const response = await fetch("/api/spirits");
  
  if (!response.ok) {
    throw new Error("Failed to fetch spirits");
  }
  
  const data = await response.json();
  return SpiritsResponseSchema.parse(data);
}

