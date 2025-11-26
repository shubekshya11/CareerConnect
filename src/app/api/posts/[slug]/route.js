import pg from "../../../lib/db";
import { NextResponse } from "next/server";

/** 
 * GET /api/posts/[slug]
 * @description Get a single blog post by its slug
 * for blogs page (public consumption)
 */

export async function GET(req, { params }) {
  const { slug } = await params;
  console.clear();
  console.log ("From single blog post:\n", slug);
  try {
    // Fetch the post by its slug
    const post = await pg("blogs").where({ slug, status: "published" }).first();

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response("Error fetching post", { status: 500 });
  }
}
