import { NextResponse } from "next/server";
import { SpiritsResponseSchema } from "@/shared/lib/zod/schemas";
import { getSpiritsStore } from "@/shared/api/spirits-store";

export async function GET() {
  try {
    const spirits = getSpiritsStore();
    const validatedData = SpiritsResponseSchema.parse(spirits);

    return NextResponse.json(validatedData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch spirits" },
      { status: 500 }
    );
  }
}
