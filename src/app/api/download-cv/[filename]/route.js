// filepath: /src/app/api/download-cv/[filename]/route.js
import path from 'path';
import { NextResponse } from 'next/server';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function GET(request, { params }) {
    try {
        const { filename } = params;
        const bucketName = process.env.AWS_CV_BUCKET;
        
        // start with user_resumes/
        const s3Key = filename.startsWith('user_resumes/') 
            ? filename 
            : `user_resumes/${filename}`;

        // Optional: Add authorization check here
        // You can verify if the user has permission to download this CV
        // For example, check if it's their own CV or if they're an admin
        
        // Fetch file from S3
        const s3 = new AWS.S3();
        const s3Object = await s3.getObject({
            Bucket: bucketName,
            Key: s3Key,
        }).promise();

        const fileBuffer = s3Object.Body;
        
        // Determine content type based on file extension
        const ext = path.extname(filename).toLowerCase();
        let contentType = 'application/octet-stream';
        
        switch (ext) {
            case '.pdf':
                contentType = 'application/pdf';
                break;
            case '.doc':
                contentType = 'application/msword';
                break;
            case '.docx':
                contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
        }
        
        // Return the file with appropriate headers
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Content-Length': s3Object.ContentLength?.toString() || '0',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Cache-Control': 'private, no-cache',
            },
        });
        
    } catch (error) {
        console.error('Error serving CV file:', error);
        
        // Handle S3-specific errors
        if (error.code === 'NoSuchKey') {
            return NextResponse.json({ message: 'File not found' }, { status: 404 });
        }
        
        return NextResponse.json({ 
            message: 'Error serving file', 
            error: error.message 
        }, { status: 500 });
    }
}