import pg from "../../lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/posts
 * @description Fetch all published blog posts. Returns a list of published blog posts for blogs page (public consumption)
 * @returns 
 */

// Slate integration
export async function GET() {
  try {
    const posts = await pg("blogs")
      .select("*")
      .where("status", "published")
      .orderBy("created_at", "desc");

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Error fetching posts", { status: 500 });
  }
}
