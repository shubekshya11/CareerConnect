import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pg from "../../../lib/db";
import bcrypt from "bcryptjs";

export async function PUT(request) {
  try {
    // Get access token from cookies
    const cookieHeader = request.headers.get('cookie');
    let accessToken = null;
    
    if (cookieHeader) {
      const accessTokenCookie = cookieHeader.split('; ').find(row => row.startsWith('accessToken='));
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.split('=')[1];
      }
    }

    if (!accessToken) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Verify the access token and get user ID
    const decoded = jwt.verify(accessToken, process.env.NEXT_ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    // Get request body
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current password and new password are required" },
        { status: 400 }
      );
    }

    const user = await pg("users").where({ id: userId }).first();

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await pg("users")
      .where({ id: userId })
      .update({ password: hashedPassword });

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { message: "Invalid or expired token. Please log in again." },
        { status: 401 }
      );
    }
    
    console.error("Change password error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
