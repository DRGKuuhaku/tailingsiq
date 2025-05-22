import { getDbContext } from '@/lib/db/types';
import { queryHistoryRepository } from '@/lib/db/repositories';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// POST /api/query - Process a natural language query
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Process the query using OpenAI API
    // This is a simplified implementation - in a real application, 
    // we would integrate with OpenAI and use vector search
    const response = await processAiQuery(query);
    
    // Save query to history
    const context = await getDbContext(request.cf);
    await queryHistoryRepository.create(context, {
      user_id: authResult.user.id,
      query,
      response: JSON.stringify(response)
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Query processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/query/history - Get query history for the current user
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
    const history = await queryHistoryRepository.getByUser(context, authResult.user.id);

    return NextResponse.json(history.results);
  } catch (error) {
    console.error('Query history fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock function to process AI queries
// In a real implementation, this would integrate with OpenAI API
async function processAiQuery(query: string) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Sample responses based on query keywords
  if (query.toLowerCase().includes('piezometer') || query.toLowerCase().includes('water level')) {
    return {
      answer: "The piezometer readings for North Dam show stable water levels within the expected range. The most recent measurements from April 22, 2025 indicate pressures between 12.3 kPa and 18.7 kPa, which is within the normal operating parameters.",
      sources: [
        { title: "North Dam Piezometer Monitoring Report", date: "April 22, 2025" },
        { title: "Tailings Dam Safety Guidelines", section: "3.2 Pore Pressure Monitoring" }
      ],
      visualizations: [
        { type: "line_chart", title: "Piezometer Readings (Last 30 Days)" }
      ]
    };
  } else if (query.toLowerCase().includes('compliance') || query.toLowerCase().includes('gistm')) {
    return {
      answer: "The North Dam facility is currently compliant with GISTM requirements. The last compliance assessment was completed on March 15, 2025, with all 15 principal requirements met. The next scheduled assessment is due on September 15, 2025.",
      sources: [
        { title: "GISTM Compliance Assessment Report", date: "March 15, 2025" },
        { title: "Global Industry Standard on Tailings Management", section: "Requirement 7" }
      ],
      visualizations: [
        { type: "status_dashboard", title: "GISTM Compliance Status" }
      ]
    };
  } else if (query.toLowerCase().includes('settlement') || query.toLowerCase().includes('displacement')) {
    return {
      answer: "Surface displacement monitoring shows minimal movement at the North Dam crest. The maximum recorded displacement in the last quarter was 3.2mm, which is below the threshold of concern (5mm). Settlement rates have been decreasing since January 2025.",
      sources: [
        { title: "North Dam Settlement Monitoring Report", date: "Q1 2025" },
        { title: "Geotechnical Assessment", section: "Deformation Analysis" }
      ],
      visualizations: [
        { type: "line_chart", title: "Settlement Trends (Last 12 Months)" }
      ]
    };
  } else if (query.toLowerCase().includes('rainfall') || query.toLowerCase().includes('weather')) {
    return {
      answer: "The cumulative rainfall at North Dam for Q1 2025 was 342mm, which is approximately 15% above the seasonal average. The maximum 24-hour rainfall event was 78mm on February 12, 2025, which triggered Level 1 monitoring protocols as per the Operations Manual.",
      sources: [
        { title: "Environmental Monitoring Report", date: "Q1 2025" },
        { title: "Weather Station Data", section: "Precipitation Records" }
      ],
      visualizations: [
        { type: "bar_chart", title: "Monthly Rainfall Comparison" }
      ]
    };
  } else {
    return {
      answer: "I don't have specific information about that query in my knowledge base. Please try asking about piezometer readings, compliance status, settlement monitoring, or rainfall data for our tailings facilities.",
      sources: [],
      visualizations: []
    };
  }
}
