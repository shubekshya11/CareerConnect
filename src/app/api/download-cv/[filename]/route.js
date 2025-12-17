// filepath: /src/app/api/download-cv/[filename]/route.js
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

// Local directory where CVs are stored
const uploadDir = path.join(process.cwd(), 'storage', 'cvs');

export async function GET(request, { params }) {
  try {
    const { filename } = params;
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

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
        contentType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch (error) {
    console.error('Error serving CV file:', error);

    return NextResponse.json(
      {
        message: 'Error serving file',
        error: error.message,
      },
      { status: 500 },
    );
  }
}