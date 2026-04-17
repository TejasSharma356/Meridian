import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/app/auth/actions';
import { LifeBuoy, Mail, MessageSquare, LogOut } from 'lucide-react';
import { GLSLHills } from '@/components/ui/glsl-hills';
import { BackButton } from '@/components/ui/back-button';

export const dynamic = 'force-dynamic';

export default async function SupportPage() {
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
          <LifeBuoy className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-white tracking-tight">Support Center</h1>
        </div>

        <div className="glass-panel ambient-glow rounded-2xl p-8 mb-8 flex flex-col gap-6">
          <p className="text-lg text-gray-300 md:leading-relaxed">
            Welcome to the Meridian OS Support Center, <span className="text-white font-medium">{user?.name ?? 'User'}</span>. We are here to help you navigate your career intelligence platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="w-full">
                <h3 className="text-lg font-medium text-white mb-1">Email Support</h3>
                <p className="text-sm text-gray-400 mb-4 h-10">Get a guaranteed response from our team within 24 hours.</p>
                <a href="mailto:support@meridian.io" className="text-accent hover:underline flex items-center gap-1 text-sm font-medium w-full">
                  support@meridian.io
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-start gap-4">
              <div className="p-3 bg-[#5865F2]/20 rounded-lg">
                <MessageSquare className="w-6 h-6 text-[#5865F2]" />
              </div>
              <div className="w-full">
                <h3 className="text-lg font-medium text-white mb-1">Community Discord</h3>
                <p className="text-sm text-gray-400 mb-4 h-10">Connect with other architects and get real-time help.</p>
                <a href="https://discord.gg/meridian" target="_blank" rel="noopener noreferrer" className="text-[#5865F2] hover:underline flex items-center gap-1 text-sm font-medium w-full">
                  Join the Server
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center bg-gray-900/40">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm text-gray-400">Currently authenticated as <span className="text-white">{user?.email}</span></p>
          </div>
          <form action={logoutUser}>
            <Button type="submit" variant="outline" className="flex items-center gap-2 border-white/10 hover:bg-white/5 text-white">
              <LogOut className="w-4 h-4" />
              End Session
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
