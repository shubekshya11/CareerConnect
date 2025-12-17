import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
import db from '../../lib/db';
import transporter from '../../lib/emailConfig';

// Local upload directory for CVs
const uploadDir = path.join(process.cwd(), 'storage', 'cvs');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// POST 
export async function POST(request) {
    try {
        const formData = await request.formData();
        
        // Extract form data
        const user_id = formData.get('user_id');
        const job_id = formData.get('job_id');
        const email = formData.get('email');
        const cover_letter = formData.get('cover_letter');
        const cvFile = formData.get('cv');

        if (!user_id || !job_id) {
            return NextResponse.json({ message: 'User ID and Job ID are required.' }, { status: 400 });
        }

        const existing = await db('applications').where({ user_id, job_id }).first();
        if (existing) {
            return NextResponse.json({ message: 'You have already applied for this job.' }, { status: 400 });
        }

        let cvPath = null;
        if (cvFile && cvFile.size > 0) {
            // Validate file type
            const allowed = ['.pdf', '.doc', '.docx'];
            const ext = path.extname(cvFile.name).toLowerCase();
            if (!allowed.includes(ext)) {
                return NextResponse.json({ message: 'Only PDF/DOC/DOCX files are allowed.' }, { status: 400 });
            }
            
            // Validate file size (5MB limit)
            if (cvFile.size > 5 * 1024 * 1024) {
                return NextResponse.json({ message: 'File size must be less than 5MB.' }, { status: 400 });
            }

            const job = await db('Jobs').where({ id: job_id }).first();
            if (!job) return NextResponse.json({ message: 'Job not found' }, { status: 404 });

            const safeUsername = email.split("@")[0].replace(/[^a-zA-Z0-9-_]/g, '_');
            const safeJobTitle = job.title.replace(/[^a-zA-Z0-9-_]/g, '_');
            const customFilename = `${safeUsername}_${safeJobTitle}_${Date.now()}${ext}`;
            const filePath = path.join(uploadDir, customFilename);

            // Convert file to buffer and write to disk locally
            const bytes = await cvFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            fs.writeFileSync(filePath, buffer);

            // Store relative path or filename for later download
            const filename = customFilename;
            cvPath = filename;
        } else {
            return NextResponse.json({ message: 'CV file is required.' }, { status: 400 });
        }

        const [application] = await db('applications')
            .insert({
                user_id,
                job_id,
                cover_letter,
                cv_path: cvPath,
            })
            .returning('*');

        const job = await db('Jobs').where({ id: job_id }).first();
        const mailOptions = {
            from: `"Sakchha Careers" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Application Confirmation",
            html: `
                <h2>Your application was received.</h2>
                <p><strong>Job Title:</strong> ${job.title}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Job Type:</strong> ${job.job_type}</p>
                <p><strong>Applied Date:</strong> ${new Date().toLocaleDateString()}</p>
            `,
        };
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Email sending failed:", error);
        }

        return NextResponse.json({ 
            message: 'Application submitted successfully', 
            application, 
            cv: { url: cvPath } 
        }, { status: 201 });
    } catch (err) {
        console.error('Job application error:', err);
        return NextResponse.json({ 
            message: 'Failed to apply for job', 
            error: err.message 
        }, { status: 500 });
    }
}

// GET 
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const applicationId = searchParams.get('applicationId');
    
    try {
        if (applicationId) {
            const application = await db('applications')
                .where({ id: applicationId })
                .first();
            if (!application) {
                return NextResponse.json({ message: 'Application not found' }, { status: 404 });
            }
            const job = await db('Jobs').where({ id: application.job_id }).first();
            application.job = job;
            return NextResponse.json(application);
        } else if (userId) {
            const applications = await db('applications').where({ user_id: userId });
            for (const app of applications) {
                app.job = await db('Jobs').where({ id: app.job_id }).first();
            }
            return NextResponse.json(applications);
        } else {
            return NextResponse.json({ message: 'Missing userId or applicationId' }, { status: 400 });
        }
    } catch (err) {
        console.error('Get applications error:', err);
        return NextResponse.json({ 
            message: 'Failed to fetch applications', 
            error: err.message 
        }, { status: 500 });
    }
}
