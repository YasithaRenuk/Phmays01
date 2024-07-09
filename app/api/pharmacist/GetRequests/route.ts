import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Required from "@/app/models/Request";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    // Fetch unapproved requests
    const requests = await Required.find({ isApproved: false });

    return NextResponse.json(
      { message: "Request successful", requests: requests },
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

export async function POST() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
