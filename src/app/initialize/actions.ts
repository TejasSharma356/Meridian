'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function saveUserProfile(formData: {
  dreamRole: string;
  resumeText?: string;
  resumeUrl?: string;
  linkedinUrl: string;
  techStack: string[];
}) {
  try {
    // 1. Get current user (Mocking user ID for now as we haven't implemented Supabase Auth fully)
    // In a real app, we'd use supabase.auth.getUser()
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    // Fallback for development/testing if not logged in
    const userId = user?.id || '00000000-0000-0000-0000-000000000000';

    // 2. Upsert the profile
    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        dream_role: formData.dreamRole,
        resume_text: formData.resumeText,
        resume_url: formData.resumeUrl,
        linkedin_url: formData.linkedinUrl,
        tech_stack: formData.techStack,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) throw error;

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Error saving user profile:', error);
    return { success: false, error: error.message };
  }
}
