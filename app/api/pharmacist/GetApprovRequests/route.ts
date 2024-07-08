import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import ApprovedRequest from "@/app/models/ApprovedRequest";

const getRequestSchema = z.object({
  phaid: z.string()
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

    const approvedRequests = await ApprovedRequest.find({ pharmacistId: body.phaid });

    if (!approvedRequests || approvedRequests.length === 0) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Request successful", requests: approvedRequests },
      { status: 200 }
    );

  } catch (error) {
    console.error("Request failed:", error);
    return NextResponse.json(
      { message: "Request failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
