import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Required from "@/app/models/Request";
import { z } from "zod";
import User from "@/app/models/user";
import ApprovedRequest from "@/app/models/ApprovedRequest";
import DoneRequest from "@/app/models/DoneRequests";

const getRequestSchema = z.object({
  Appreqid: z.string()
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

    const approvedrequest = await ApprovedRequest.findById(body.Appreqid);
    if (!approvedrequest) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      );
    }

    const customer = await User.findOne({email:approvedrequest.coustomerEmail});
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const donerequest = {
      pharmacistId: approvedrequest.pharmacistId,
      EndDate: new Date(),
      coustomerId: customer._id,
      drugs:approvedrequest.drugs
    };

    const yes = await DoneRequest.create(donerequest);

    await Required.findByIdAndDelete(approvedrequest.RequestId)
    await ApprovedRequest.findByIdAndDelete(approvedrequest._id)

    return NextResponse.json(
      { message: "Request successful", request: yes },
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
