import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/User";
import DocumentsEntity from "@/app/models/DocumentsEntity";
import { getServerSession } from "next-auth";

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
    const qrCode = await DocumentsEntity.findOne({ userId: qrCodeId });

    if (!qrCode) {
      console.error("QR Code not found:", { qrCodeId });
      return NextResponse.json(
        { message: "QR code not found" },
        { status: 404 }
      );
    }

    // Check if QR code is already redeemed
    if (qrCode.redeemed) {
      console.error("QR Code already redeemed:", { qrCodeId });
      return NextResponse.json(
        { message: "QR code already redeemed" },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the QR code is already in the user's list
    if (user.qrCodes.includes(qrCode._id)) {
      console.error("QR Code already in user's list:", { qrCodeId });
      return NextResponse.json(
        { message: "QR code already redeemed by this user" },
        { status: 400 }
      );
    }

    // Add QR code to user's list
    user.qrCodes.push(qrCode._id);
    await user.save();

    // Mark the QR code as redeemed
    qrCode.redeemed = true;
    await qrCode.save();

    // Fetch the user again to ensure the QR code is added
    const updatedUser = await User.findById(userId).populate("qrCodes");

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
