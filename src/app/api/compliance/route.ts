import { getDbContext } from '@/lib/db/types';
import { complianceRepository } from '@/lib/db/repositories';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// GET /api/compliance - Get all compliance records
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
    const complianceRecords = await complianceRepository.getAll(context);

    return NextResponse.json(complianceRecords.results);
  } catch (error) {
    console.error('Compliance records fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/compliance - Create a new compliance record
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
    const { facility_id, requirement_id, status, next_check_date, notes } = body;

    if (!facility_id || !requirement_id || !status) {
      return NextResponse.json(
        { error: 'Facility ID, requirement ID, and status are required' },
        { status: 400 }
      );
    }

    const context = await getDbContext(request.cf);
    const result = await complianceRepository.create(context, {
      facility_id,
      requirement_id,
      status,
      next_check_date,
      notes
    });

    return NextResponse.json(result.results, { status: 201 });
  } catch (error) {
    console.error('Compliance record creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
