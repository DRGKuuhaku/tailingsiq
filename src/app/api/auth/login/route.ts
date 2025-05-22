import { getDbContext } from '@/lib/db/types';
import { userRepository } from '@/lib/db/repositories';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tailingsiq-secret-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('[LOGIN] Request received with:', { email });

    if (!email || !password) {
      console.log('[LOGIN] Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const context = await getDbContext(request.cf);
    const user = await userRepository.getByEmail(context, email);

    if (!user) {
      console.log('[LOGIN] No user found for email:', email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('[LOGIN] User found:', user.email);

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      console.log('[LOGIN] Password mismatch for user:', user.email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('[LOGIN] Password matched. Creating token.');

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    cookies().set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    console.log('[LOGIN] Token issued and cookie set');

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

  } catch (error) {
    console.error('[LOGIN] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
