import { NextResponse } from "next/server";
import pg from "../../../lib/db";

export async function POST(request) {
  try {
    // Get refresh token from cookies or request body
    let refreshToken;
    
    try {
      const body = await request.json();
      refreshToken = body.refreshToken;
    } catch {
      // If no JSON body, check cookies
    }

    if (!refreshToken) {
      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        const refreshTokenCookie = cookieHeader.split('; ').find(row => row.startsWith('refreshToken='));
        if (refreshTokenCookie) {
          refreshToken = refreshTokenCookie.split('=')[1];
        }
      }
    }

    // Remove refresh token from database if it exists
    if (refreshToken) {
      await pg("refresh_tokens").where({ token: refreshToken }).del();
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

    response.cookies.set('accessToken', '', clearCookieOptions);
    response.cookies.set('refreshToken', '', clearCookieOptions);

    return response;

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}