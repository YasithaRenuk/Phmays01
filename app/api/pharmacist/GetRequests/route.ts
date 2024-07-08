import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Required from "@/app/models/Request";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const request = (await Required.find()).filter((e)=>{return !e.isApproved});

    return NextResponse.json(
      { message: "Request successful", request: request },
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

export async function POST() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
