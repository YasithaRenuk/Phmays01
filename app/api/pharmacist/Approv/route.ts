import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Required from "@/app/models/Request";
import { z } from "zod";
import User from "@/app/models/user";
import ApprovedRequest from "@/app/models/ApprovedRequest";

const getRequestSchema = z.object({
  reqid: z.string(),
  phaid: z.string(),
  phaEmail: z.string()
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

    const request = await Required.findById(body.reqid);
    if (!request) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      );
    }

    const customer = await User.findById(request.customerId);
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const approv = {
      RequestId: body.reqid,
      pharmacistId: body.phaid,
      createDate: new Date(),
      coustomerEmail: customer.email,
      drugs: request.drugs
    };

    const yes = await ApprovedRequest.create(approv);

    const updateResult = await Required.findByIdAndUpdate(
      body.reqid, 
      { isApproved: true, pharmacistId: body.phaid, pharmacistEmail: body.phaEmail }, 
      { new: true }
    );

    if (!updateResult) {
      return NextResponse.json(
        { error: "Failed to update the request" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Request successful", request: yes, updateResult },
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
