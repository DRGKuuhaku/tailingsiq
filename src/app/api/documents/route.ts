import { getDbContext } from '@/lib/db/types';
import { documentRepository } from '@/lib/db/repositories';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// GET /api/documents - Get all documents
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const context = await getDbContext(request.cf);
    const documents = await documentRepository.getAll(context);

    return NextResponse.json(documents.results);
  } catch (error) {
    console.error('Documents fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/documents - Create a new document
export async function POST(request: NextRequest) {
  try {
    // Verify authentication and admin/manager role
    const authResult = await verifyAuth(request, ['admin', 'manager']);
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { title, description, file_path, file_type, file_size, metadata, tags } = body;

    if (!title || !file_path || !file_type || !file_size) {
      return NextResponse.json(
        { error: 'Title, file_path, file_type, and file_size are required' },
        { status: 400 }
      );
    }

    const context = await getDbContext(request.cf);
    const result = await documentRepository.create(context, {
      title,
      description,
      file_path,
      file_type,
      file_size,
      uploaded_by: authResult.user.id,
      metadata,
      tags
    });

    return NextResponse.json(result.results, { status: 201 });
  } catch (error) {
    console.error('Document creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
