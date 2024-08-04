import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import QrCode from "@/app/models/qrCode";

export async function POST(req) {
  try {
    const { data } = await req.json();
    await dbConnect();

    if (!data) {
      return NextResponse.json(
        { message: "QR code data is required" },
        { status: 400 }
      );
    }

    const newQrCode = new QrCode({ data });
    await newQrCode.save();

    return NextResponse.json({
      message: "QR code added successfully",
      newQrCode,
    });
  } catch (error) {
    console.error("Error adding QR code:", error);
    return NextResponse.json(
      { message: "Error adding QR code", error },
      { status: 500 }
    );
  }
}
