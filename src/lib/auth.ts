import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET || 'a_very_secure_random_string_for_local_hackathon_998877';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (e) {
    return null;
  }
}

export async function setSession(userId: string, isDev?: boolean) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expires, isDev });
  
  (await cookies()).set('auth-token', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const session = (await cookies()).get('auth-token')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function clearSession() {
  (await cookies()).delete('auth-token');
}
