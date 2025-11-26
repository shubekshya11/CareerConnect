import { NextResponse } from 'next/server';
import pg from '@/app/lib/db';

export async function POST(request) {
    try {
        const { email, code } = await request.json();

        // Find user by email
        const user = await pg('users').where({ email }).first();
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
        }

        if (user.verification_code !== code) {
            return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
        }

        // Update user as verified and clear verification_code
        await pg('users')
            .where({ email })
            .update({ is_verified: true, verification_code: null });

        return NextResponse.json({ message: 'Email verified successfully!', success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}