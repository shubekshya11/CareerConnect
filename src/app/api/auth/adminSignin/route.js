import { NextResponse } from "next/server";
import pg from "../../../lib/db";
import bcrypt from "bcryptjs";
import {
  generateAdminAccessToken,
  generateAdminRefreshToken,
} from "../../../lib/adminToken";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await pg("admin").where({ username }).first();

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = generateAdminAccessToken(user);
    const refreshToken = await generateAdminRefreshToken(user);

    // Create user session data (no tokens exposed to client)
    const userData = {
      id: user.id,
      username: user.username,
      role: "admin",
    };

    // Create response with cookies for server-side authentication
    const response = NextResponse.json({
      success: true,
      user: userData,
      message: "Login successful"
    });

    // Set httpOnly cookies for middleware authentication
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // Only require HTTPS in production
      sameSite: 'lax',
      path: '/'
    };

    response.cookies.set('adminAccessToken', accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60, // 15 minutes (same as JWT expiry)
    });

    response.cookies.set('adminRefreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}