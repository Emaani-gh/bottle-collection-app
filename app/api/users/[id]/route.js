import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import User from "@/app/models/User";
import dbConnect from "@/app/lib/mongodb";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req, { params }) {
  await dbConnect();
  const token = await getToken({ req, secret });

  if (!token || token.id !== params.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const user = await User.findById(params.id).populate("qrCodes");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const token = await getToken({ req, secret });

  if (!token || token.id !== params.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { firstName, lastName, email } = await req.json();

  try {
    const user = await User.findByIdAndUpdate(
      params.id,
      { firstName, lastName, email },
      { new: true }
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const token = await getToken({ req, secret });

  if (!token || token.id !== params.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error },
      { status: 500 }
    );
  }
}
