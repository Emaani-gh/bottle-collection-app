import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/User";
import QrCode from "@/app/models/qrCode";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export async function POST(req, { params }) {
  try {
    const { qrCodeId } = params;
    const { userId } = await req.json();
    await dbConnect();

    const session = await getServerSession({ req });

    if (!session) {
      return NextResponse.json(
        { message: "User not signed in" },
        { status: 401 }
      );
    }

    // Check if QR code exists
    const qrCode = await QrCode.findOne({ data: qrCodeId });

    if (!qrCode) {
      return NextResponse.json(
        { message: "QR code not found" },
        { status: 404 }
      );
    }

    // Find user by ID
    const user = await User.findById(new ObjectId(userId));

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("User before adding QR code:", user);

    // Add QR code to user's list
    user.qrCodes.push(qrCode._id);

    await user.save();

    // Fetch the user again to ensure the QR code is added
    const updatedUser = await User.findById(new ObjectId(userId)).populate(
      "qrCodes"
    );

    return NextResponse.json({
      message: "QR code redeemed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error redeeming QR code:", error);
    return NextResponse.json(
      { message: "Error redeeming QR code", error },
      { status: 500 }
    );
  }
}
