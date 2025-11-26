import pg from "../../../lib/db";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "../../../../auth";

/**
 * GET /api/jobs/[slug]
 * @description Get job by slug with applied status for authenticated users
 */
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const jobResult = await pg('Jobs').where({ id }).first();

        if (!jobResult) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        // Check if user has applied to this job
        try {
            const user = await getUserFromRequest(request);
            if (user.id) {
                const application = await pg('applications')
                    .where({ user_id: user.id, job_id: id })
                    .first();
                jobResult.isApplied = !!application;
            } else {
                jobResult.isApplied = false;
            }
        } catch (err) {
            
            jobResult.isApplied = false;
        }

        return NextResponse.json(jobResult, { status: 200 });
    } catch (err) {
        console.error('Error fetching job:', err);
        return NextResponse.json({ message: 'Failed to fetch job' }, { status: 500 });
    }
}

/**
 * PUT /api/jobs/[slug]
 * @description Update job by slug
 */
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const jobResult = await pg('Jobs').where({ id }).first();
        if (!jobResult) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        // TODO: Add authorization check when user context is available
        // if (user.role !== 'admin' && jobResult.userId !== user.userId) {
        //     return NextResponse.json({ message: 'Access denied: Cannot edit this job' }, { status: 403 });
        // }

        const updatedJob = await pg('Jobs')
            .where({ id })
            .update(body)
            .returning('*');

        return NextResponse.json(updatedJob[0], { status: 200 });
    } catch (err) {
        console.error('Error updating job:', err);
        return NextResponse.json({ message: 'Failed to update job' }, { status: 500 });
    }
}

/**
 * DELETE /api/jobs/[slug]
 * @description Delete job by slug
 */
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const jobResult = await pg('Jobs').where({ id }).first();

        if (!jobResult) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        // TODO: Add authorization check when user context is available
        // if (user.role !== 'admin' && jobResult.userId !== user.userId) {
        //     return NextResponse.json({ message: 'Access denied: Cannot delete this job' }, { status: 403 });
        // }

        await pg('Jobs').where({ id }).del();

        return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });
    } catch (err) {
        console.error('Error deleting job:', err);
        return NextResponse.json({ message: 'Failed to delete job' }, { status: 500 });
    }
}