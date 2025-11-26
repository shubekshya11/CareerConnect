import pg from "../../lib/db";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/auth";
import { getAdminFromRequest } from "@/auth";

/**
 * POST /api/jobs
 * @description Create a new job posting
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      id,
      company,
      location,
      salary,
      job_type,
      vacancy_qty,
      qualifications,
      job_description,
      responsibilities,
      deadline,
      slug,
    } = body || {};

    if (!title || !company || !location || !salary || !qualifications || !job_type || !job_description) {
      return NextResponse.json(
        { message: "Required fields missing." },
        { status: 400 }
      );
    }

    // Ensure slug exists; generate from title if not provided
    let finalSlug = slug;
    if (!finalSlug) {
      // simple slugify: lowercase, replace non-alphanum with hyphens
      finalSlug = title
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      // ensure uniqueness by appending timestamp
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-6)}`;
    }

    const result = await pg("Jobs")
      .insert({
        title,
        slug: finalSlug,
        id,
        company,
        location,
        salary,
        job_type,
        vacancy_qty,
        qualifications,
        job_description,
        responsibilities,
        deadline,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning("*");

    return NextResponse.json(result[0], { status: 201 });
  } catch (err) {
    console.error("Error creating job:", err);
    return NextResponse.json(
      { message: "Failed to create job", error: err.message },
      { status: 500 }
    );
  }
}
/**
 * GET /api/jobs
 * @description Get all jobs excluding already applied jobs for users, all jobs for admins
 */
export async function GET(request) {
  let isUserRoute = false; // by default false
  let isAdminRoute = false; // by default false
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword")?.trim();
    isUserRoute = searchParams.get('user');
    isAdminRoute = searchParams.get("admin"); 

    let query;

    if (isAdminRoute) {
      console.log ("it is: ",isAdminRoute)

      const admin = await getAdminFromRequest(request);
      if (!admin) {
        return NextResponse.json(
          { message: "Unauthorized - No valid admin token" },
          { status: 401 }
        );
      }

      query = pg("Jobs")
        .select("*")
        .orderBy("created_at", "desc");
    } else if (isUserRoute) {
      // USER: Verify user token and filter applied jobs
      const user = await getUserFromRequest(request);
      if (!user) {
        return NextResponse.json(
          { message: "Unauthorized - No valid user token" },
          { status: 401 }
        );
      }

      const userId = user.id.toString();

      query = pg("Jobs")
        .select("id", "title", "job_type", "location", "vacancy_qty", "deadline")
        .orderBy("created_at", "desc");

      // Apply applied jobs filter for users
      if (userId) {
        const appliedJobs = await pg("applications")
          .where({ user_id: userId })
          .select("job_id");

        const appliedJobIds = appliedJobs.map(j => j.job_id);

        if (appliedJobIds.length > 0) {
          query = query.whereNotIn("id", appliedJobIds);
        }
      }
    } else {
      query = pg("Jobs")
        .select("id", "title", "job_type", "location", "vacancy_qty", "deadline")
        .orderBy("created_at", "desc");
    }

    // Multi-keyword search
    if (keyword) {
      const words = keyword.split(/\s+/).filter(Boolean);
      query = query.andWhere(function () {
        for (const word of words) {
          this.orWhere(function () {
            this.whereILike("title", `%${word}%`)
              .orWhereILike("company", `%${word}%`)
              .orWhereILike("location", `%${word}%`)
              .orWhereILike("job_type", `%${word}%`);
          });
        }
      });
    }

    const jobs = await query;
    return NextResponse.json(jobs, { status: 200 });

  } catch (err) {
    console.error("Error fetching jobs:", err);
    return NextResponse.json(
      { message: "Failed to fetch jobs", error: err.message },
      { status: 500 }
    );
  }
}