-- SQL to create the user_profiles table in Supabase
-- This table powers the career intelligence calibration.

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  dream_role TEXT NOT NULL,
  resume_text TEXT,
  resume_url TEXT,
  linkedin_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own profile
CREATE POLICY "Users can only see their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Policy: Users can only update their own profile
CREATE POLICY "Users can only update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Policy: Users can initially insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);
