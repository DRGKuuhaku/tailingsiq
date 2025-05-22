import { getDbContext } from '@/lib/db/types';
import { monitoringRepository } from '@/lib/db/repositories';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// GET /api/monitoring - Get all monitoring data
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
    const monitoringData = await monitoringRepository.getAll(context);

    return NextResponse.json(monitoringData.results);
  } catch (error) {
    console.error('Monitoring data fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/monitoring - Create new monitoring data
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
    const { facility_id, metric_type, value, source, status } = body;

    if (!facility_id || !metric_type || value === undefined || !source || !status) {
      return NextResponse.json(
        { error: 'Facility ID, metric type, value, source, and status are required' },
        { status: 400 }
      );
    }

    const context = await getDbContext(request.cf);
    const result = await monitoringRepository.create(context, {
      facility_id,
      metric_type,
      value,
      source,
      status
    });

    return NextResponse.json(result.results, { status: 201 });
  } catch (error) {
    console.error('Monitoring data creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
