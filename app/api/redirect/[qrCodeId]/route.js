import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import QrCode from "@/app/models/qrCode";
import { ObjectId } from "mongodb";

export async function POST(req, { params }) {
  try {
    const { qrCodeId } = params;
    const { userId } = await req.json();
    await dbConnect();

    const session = await getServerSession({ req });
    console.log("Session:", session);
    console.log("userId:", userId);

    if (!session) {
      return NextResponse.json(
        { message: "User not signed in" },
        { status: 401 }
      );
    }

    // Check if QR code exists
    const qrCode = await QrCode.findById(qrCodeId);
    console.log("QR Code:", qrCode);

    if (!qrCode) {
      return NextResponse.json(
        { message: "QR code not found" },
        { status: 404 }
      );
    }

    // Add QR code to user's list
    const user = await User.findById(new ObjectId(userId));
    console.log("User:", user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.qrCodes.push(qrCode._id);
    await user.save();

    return NextResponse.json({ message: "QR code redeemed successfully" });
  } catch (error) {
    console.error("Error redeeming QR code:", error);
    return NextResponse.json(
      { message: "Error redeeming QR code", error },
      { status: 500 }
    );
  }
}
