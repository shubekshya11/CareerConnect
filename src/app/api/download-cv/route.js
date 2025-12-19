import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

// Local directory where CVs are stored
const uploadDir = path.join(process.cwd(), 'storage', 'cvs');

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const filename = url.searchParams.get('filename');

    if (!filename || typeof filename !== 'string') {
      return NextResponse.json(
        { message: 'Invalid filename' },
        { status: 400 }
      );
    }

    const safeFilename = path.basename(filename);

    const filePath = path.join(uploadDir, safeFilename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    const ext = path.extname(safeFilename).toLowerCase();
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

    // Check if user wants to view (inline) or download (attachment)
    const disposition = url.searchParams.get('download') === 'true' 
      ? 'attachment' 
      : 'inline';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `${disposition}; filename="${safeFilename}"`,
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

