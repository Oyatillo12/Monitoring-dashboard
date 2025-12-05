import { NextRequest, NextResponse } from "next/server";
import { CaptureSpiritResponseSchema } from "@/shared/lib/zod/schemas";
import { getSpiritsStore, updateSpirit } from "@/shared/api/spirits-store";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const spirits = getSpiritsStore();
    const spirit = spirits.find((s) => s.id === id);

    if (!spirit) {
      return NextResponse.json(
        CaptureSpiritResponseSchema.parse({
          success: false,
          message: "Spirit not found",
        }),
        { status: 404 }
      );
    }

    const success = Math.random() > 0.3;

    if (!success) {
      return NextResponse.json(
        CaptureSpiritResponseSchema.parse({
          success: false,
          message: "Capture attempt failed. The spirit resisted.",
        }),
        { status: 400 }
      );
    }

    updateSpirit(id, { status: "Captured" });

    return NextResponse.json(
      CaptureSpiritResponseSchema.parse({
        success: true,
        message: "Spirit captured successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error capturing spirit:", error);
    return NextResponse.json(
      CaptureSpiritResponseSchema.parse({
        success: false,
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}
