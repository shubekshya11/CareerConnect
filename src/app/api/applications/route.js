import pg from "../../lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/applications
 * @description Get all applications for admin review
 */
export async function GET(request) {
  try {
    const applications = await pg("applications").orderBy("created_at", "desc");

    const applicationsWithDetails = [];

    for (const app of applications) {
      const jobId = app.job_id;
      const userId = app.user_id;

      const job = jobId
        ? await pg("Jobs")
            .select(
              "id",
              "title",
              "company",
              "location",
              "job_type",
              "deadline",
              "created_at"
            )
            .where({ id: jobId })
            .first()
        : null;

      const user = userId
        ? await pg("users")
            .select(
              "id",
              "firstname",
              "lastname",
              "email",
              "phone",
              "address",
              "skills",
              "experience",
              "education"
            )
            .where({ id: userId })
            .first()
        : null;

      applicationsWithDetails.push({
        ...app,
        address: user?.address || null,
        skills: user?.skills || null,
        experience: user?.experience || null,
        job: job || null,
        user: user || null,
      });
    }

    return NextResponse.json(applicationsWithDetails, { status: 200 });
  } catch (err) {
    console.error("Error fetching applications:", err);
    return NextResponse.json(
      { message: "Failed to fetch applications", error: err.message },
      { status: 500 }
    );
  }
}