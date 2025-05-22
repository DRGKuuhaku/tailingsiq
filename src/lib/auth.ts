import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tailingsiq-secret-key';

export interface AuthResult {
  success: boolean;
  user?: any;
  error?: string;
  status?: number;
}

export async function verifyAuth(request: NextRequest, allowedRoles?: string[]): Promise<AuthResult> {
  // Get the auth token from cookies
  const token = cookies().get('auth_token')?.value;

  if (!token) {
    return {
      success: false,
      error: 'Not authenticated',
      status: 401
    };
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Check if user has required role
    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return {
        success: false,
        error: 'Insufficient permissions',
        status: 403
      };
    }

    return {
      success: true,
      user: decoded
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      error: 'Invalid token',
      status: 401
    };
  }
}
