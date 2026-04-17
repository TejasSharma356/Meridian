'use server';

import dbConnect from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

export async function saveUserProfile(formData: FormData) {
  try {
    await dbConnect();
    
    // 1. Get real userId from session
    const session = await getSession();
    if (!session || !session.userId) {
      return { success: false, error: "Unauthorized session" };
    }
    const userId = session.userId;
    
    // DEV MODE BYPASS: Do not store anything in DB but simulate success
    if (session.isDev) {
      console.log('DEV_MODE: Skipping DB persistence for userId:', userId);
      return { success: true, isDev: true };
    }

    const dreamRole = formData.get('dreamRole') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;
    const techStack = formData.getAll('techStack') as string[];
    const resumeMode = formData.get('resumeMode') as string;
    
    let resumeText = '';
    let resumeUrl = '';

    if (resumeMode === 'text') {
      resumeText = formData.get('resumeText') as string;
    } else {
      const file = formData.get('resumeFile') as File | null;
      if (file) {
        resumeUrl = file.name;
        // In a real app, we would upload to S3/Cloudinary here.
        // For this prototype, we'll store metadata and mock the content.
        resumeText = `[File Uploaded: ${file.name} (${file.size} bytes)]`;
      }
    }

    // 2. Upsert the profile
    await UserProfile.findOneAndUpdate(
      { userId },
      {
        dreamRole,
        resumeText,
        resumeUrl,
        linkedinUrl,
        techStack,
      },
      { upsert: true, new: true }
    );

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Error saving user profile:', error);
    return { success: false, error: error.message };
  }
}
