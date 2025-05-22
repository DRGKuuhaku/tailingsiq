import { D1Database } from '@cloudflare/workers-types';

export interface DbContext {
  db: D1Database;
}

export async function getDbContext(env: any): Promise<DbContext> {
  return {
    db: env.DB
  };
}

// User types
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'viewer';
  created_at: string;
  updated_at: string;
}

// Facility types
export interface Facility {
  id: number;
  name: string;
  location: string;
  description: string | null;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: string;
  updated_at: string;
}

// Document types
export interface Document {
  id: number;
  title: string;
  description: string | null;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: number;
  upload_date: string;
  metadata: Record<string, any> | null;
  tags: string | null;
}

// Monitoring data types
export interface MonitoringData {
  id: number;
  facility_id: number;
  metric_type: string;
  value: number;
  timestamp: string;
  source: string;
  status: 'normal' | 'warning' | 'critical';
}

// Compliance record types
export interface ComplianceRecord {
  id: number;
  facility_id: number;
  requirement_id: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  last_checked: string;
  next_check_date: string | null;
  notes: string | null;
}

// Query history types
export interface QueryHistory {
  id: number;
  user_id: number;
  query: string;
  response: string;
  timestamp: string;
}
