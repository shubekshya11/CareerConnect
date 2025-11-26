import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pg from "@/app/lib/db";

export async function GET(request) {
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
        { error: "No access token found" },
        { status: 401 }
      );
    }

    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.NEXT_ACCESS_TOKEN_SECRET);

    // Get fresh user data from database
    const user = await pg("users").where({ id: decoded.id }).first();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return user data (without sensitive info)
    const userData = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      phone: user.phone,
      address: user.address,
      skills: user.skills,
      education: user.education,
      experience: user.experience,
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