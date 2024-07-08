import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Required from "@/app/models/Request";
import { z } from "zod";

const drugSchema = z.object({
    name: z.string(),
    quantity: z.string(),
    measurement: z.string()
});

const AddRequestSchema = z.object({
    customerId: z.string(),
    drugs: z.array(drugSchema)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validity = AddRequestSchema.safeParse(body);

    if (!validity.success) {
      return NextResponse.json(
        { error: validity.error.errors },
        { status: 400 }
      );
    }

    const newRequest = { ...body, isApproved: false, createDate: new Date(),pharmacistId:null,pharmacistEmail:null };

    await connectMongoDB(); // Ensure the database connection is established
    await Required.create(newRequest);

    return NextResponse.json(
      { message: "Request registration successful", request: newRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request registration failed:", error);
    return NextResponse.json(
      { message: "Request registration failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
