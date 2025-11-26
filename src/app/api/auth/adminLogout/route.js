import { NextResponse } from "next/server";
import pg from "../../../lib/db";

export async function POST(request) {
  try {
    // Get admin refresh token from body or cookies
    let adminRefreshToken;

    try {
      const body = await request.json();
      adminRefreshToken = body.adminRefreshToken;
    } catch {
      // If no JSON body, check cookies
    }

    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader && !adminRefreshToken) {
      const adminRefreshTokenCookie = cookieHeader
        .split("; ")
        .find((row) => row.startsWith("adminRefreshToken="));
      if (adminRefreshTokenCookie) {
        adminRefreshToken = adminRefreshTokenCookie.split("=")[1];
      }
    }

    // Remove admin refresh token from database if it exists
    if (adminRefreshToken) {
      await pg("refresh_tokens").where({ token: adminRefreshToken }).del();
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully"
    });

    // Clear cookies by setting them with past expiration date
    const isProduction = process.env.NODE_ENV === 'production';
    const clearCookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    };

    // These names must match what adminSignin sets
    response.cookies.set('adminAccessToken', '', clearCookieOptions);
    response.cookies.set('adminRefreshToken', '', clearCookieOptions);

    return response;

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

