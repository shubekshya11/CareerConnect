import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pg from "../../../lib/db";

export async function GET(request) {
  try {
    // Get access token from cookies
    const cookieHeader = request.headers.get('cookie');
    let accessToken = null;
    
    if (cookieHeader) {
      const accessTokenCookie = cookieHeader.split('; ').find(row => row.startsWith('adminAccessToken='));
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.split('=')[1];
      }
    }

    if (!accessToken) {
      return NextResponse.json(
        { error: "No access token found" },
        { status: 401 }
      );
    }

    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.NEXT_ADMIN_ACCESS_TOKEN_SECRET);

    // Get fresh user data from database
    const user = await pg("admin").where({ id: decoded.id }).first();

    if (!user) {
      return NextResponse.json(
        { error: "Admin User not found" },
        { status: 404 }
      );
    }

    // Return user data (without sensitive info)
    const userData = {
      id: user.id,
      user: user.username,
      role: "admin",
    };

    return NextResponse.json({
      success: true,
      user: userData
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
    
    console.error("Get user info error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}