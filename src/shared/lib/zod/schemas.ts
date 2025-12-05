import { z } from "zod";

export const ThreatLevelSchema = z.enum(["Low", "Medium", "High", "Critical"]);
export type ThreatLevel = z.infer<typeof ThreatLevelSchema>;

export const SpiritStatusSchema = z.enum(["Active", "Captured"]);
export type SpiritStatus = z.infer<typeof SpiritStatusSchema>;

export const SpiritSchema = z.object({
  id: z.string(),
  name: z.string(),
  threatLevel: ThreatLevelSchema,
  location: z.string(),
  status: SpiritStatusSchema,
});
export type Spirit = z.infer<typeof SpiritSchema>;

export const SpiritsResponseSchema = z.array(SpiritSchema);
export type SpiritsResponse = z.infer<typeof SpiritsResponseSchema>;

export const CaptureSpiritResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
export type CaptureSpiritResponse = z.infer<typeof CaptureSpiritResponseSchema>;

export const SpiritUpdateEventSchema = z.object({
  id: z.string(),
  threatLevel: ThreatLevelSchema,
});
export type SpiritUpdateEvent = z.infer<typeof SpiritUpdateEventSchema>;
