'use server';

import { setSession, clearSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function logoutUser() {
  await clearSession();
  redirect('/auth');
}

export async function bypassAuthAction() {
  const DEV_USER_ID = "dev_bypass_alex_mercer";
  await setSession(DEV_USER_ID, true);
  redirect('/dashboard');
}

export async function signInUser(data: any) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: data.email });
    
    if (!user) {
      return { error: "Security mismatch: Vector not found" };
    }

    if (user.authProvider === 'google') {
      return { error: "External Uplink detected: Use Google Sign-in" };
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      return { error: "Security mismatch: Invalid decryption key" };
    }

    await setSession(user._id.toString());
    
    // Check if profile exists to determine redirect
    const profile = await UserProfile.findOne({ userId: user._id.toString() });
    return { redirectTo: profile ? '/dashboard' : '/initialize' };
  } catch (error: any) {
    return { error: "System failure during authentication" };
  }
}

export async function signUpUser(data: any) {
  try {
    await dbConnect();
    const existing = await User.findOne({ email: data.email });
    
    if (existing) {
      return { error: "Identification collision: DNA already registered" };
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
      authProvider: 'local'
    });

    await setSession(user._id.toString());
    return { redirectTo: '/initialize' };
  } catch (error: any) {
    return { error: "System failure during registration" };
  }
}

export async function googleSignInUser(accessToken: string) {
  try {
    // Verify token with Google
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
    const googleUser = await response.json();

    if (!googleUser.email) {
      return { error: "External verification failure" };
    }

    await dbConnect();
    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        authProvider: 'google'
      });
    }

    await setSession(user._id.toString());
    
    const profile = await UserProfile.findOne({ userId: user._id.toString() });
    return { redirectTo: profile ? '/dashboard' : '/initialize' };
  } catch (error: any) {
    return { error: "Google Uplink failed" };
  }
}
