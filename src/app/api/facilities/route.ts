import { getDbContext } from '@/lib/db/types';
import { facilityRepository } from '@/lib/db/repositories';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// GET /api/facilities - Get all facilities
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
    const facilities = await facilityRepository.getAll(context);

    return NextResponse.json(facilities.results);
  } catch (error) {
    console.error('Facilities fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/facilities - Create a new facility
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
    const { name, location, description, status } = body;

    if (!name || !location || !status) {
      return NextResponse.json(
        { error: 'Name, location, and status are required' },
        { status: 400 }
      );
    }

    const context = await getDbContext(request.cf);
    const result = await facilityRepository.create(context, {
      name,
      location,
      description,
      status
    });

    return NextResponse.json(result.results, { status: 201 });
  } catch (error) {
    console.error('Facility creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
