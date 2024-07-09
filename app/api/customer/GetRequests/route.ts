import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Required from "@/app/models/Request";
import { z } from "zod";

const getRequestSchema = z.object({
  id: z.string()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validity = getRequestSchema.safeParse(body);

    if (!validity.success) {
      return NextResponse.json(
        { error: validity.error.errors },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const request = await Required.find({ customerId: body.id });

    return NextResponse.json(
      { message: "Request successful", request: request },
      { status: 200 }
    );

  } catch (error) {
    console.error("Request failed:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Request failed", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
