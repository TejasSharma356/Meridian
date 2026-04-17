import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/app/auth/actions';
import { User as UserIcon, Mail, Shield, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { GLSLHills } from '@/components/ui/glsl-hills';
import { BackButton } from '@/components/ui/back-button';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  let session;
  try {
    session = await getSession();
  } catch(e) {
    // Suppress error during reload
  }
  
  if (!session?.userId) {
    redirect('/auth');
  }

  await dbConnect();
  const user = await User.findOne({ _id: session.userId }).lean();

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-start px-12 pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GLSLHills width="100vw" height="100vh" cameraZ={150} />
      </div>

      <div className="relative z-10 w-full max-w-3xl px-6">
        <BackButton className="mb-6" />
        <div className="mb-8 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-white tracking-tight">System Settings</h1>
        </div>

        <div className="glass-panel ambient-glow rounded-2xl p-8 mb-8 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white mb-2">User Identity</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
              <UserIcon className="w-6 h-6 text-accent mt-1" />
              <div>
                <p className="text-sm text-gray-400">FullName</p>
                <p className="text-lg font-medium text-white">{user?.name ?? 'N/A'}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
              <Mail className="w-6 h-6 text-accent mt-1" />
              <div>
                <p className="text-sm text-gray-400">Email Address</p>
                <p className="text-lg font-medium text-white break-all">{user?.email ?? 'N/A'}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4 md:col-span-2">
              <Shield className="w-6 h-6 text-accent mt-1" />
              <div>
                <p className="text-sm text-gray-400">Authentication Provider</p>
                <p className="text-lg font-medium text-white capitalize">{user?.authProvider ?? 'local'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center bg-red-950/10 border border-red-900/30">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold text-white">End Session</h3>
            <p className="text-sm text-gray-400">Securely sign out of the Meridian OS.</p>
          </div>
          <form action={logoutUser}>
            <Button type="submit" variant="destructive" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
