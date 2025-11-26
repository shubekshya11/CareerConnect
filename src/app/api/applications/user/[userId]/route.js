import pg from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { user_id } = params;

    const applications = await pg("Applications")
      .where("Applications.user_id", user_id)
      .join("Jobs", "Applications.job_id", "Jobs.id")
      .select(
        "Applications.id",
        "Applications.created_at",
        "Jobs.title",
        "Jobs.company",
        "Jobs.id"
      )
      .orderBy("Applications.created_at", "desc");

    return NextResponse.json(applications, { status: 200 });
  } catch (err) {
    console.error("Error fetching applications:", err);
    return NextResponse.json(
      { message: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}
