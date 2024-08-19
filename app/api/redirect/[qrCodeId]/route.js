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

    // Query all QR codes where userId matches qrCodeId
    const qrCodes = await DocumentsEntity.find({ userId: qrCodeId });

    if (qrCodes.length === 0) {
      console.error("No QR Codes found for userId:", { qrCodeId });
      return NextResponse.json(
        { message: "No QR codes found" },
        { status: 404 }
      );
    }

    // Retrieve the user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Process each QR code
    let qrCodesRedeemed = 0;
    for (const qrCode of qrCodes) {
      // Only proceed if the QR code is not already redeemed
      if (!user.qrCodes.includes(qrCode._id)) {
        // Add QR code to user's list
        user.qrCodes.push(qrCode._id);

        // Mark the QR code as redeemed
        qrCode.redeemed = true; // Adding the redeemed field
        await qrCode.save();

        qrCodesRedeemed++;
      }
    }

    await user.save();

    if (qrCodesRedeemed === 0) {
      return NextResponse.json(
        { message: "No QR codes redeemed" },
        { status: 400 }
      );
    }

    // Fetch the updated user with populated QR codes
    const updatedUser = await User.findById(userId).populate("qrCodes");

    return NextResponse.json({
      message: `Successfully redeemed ${qrCodesRedeemed} QR code(s)`,
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
