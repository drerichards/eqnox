import { cookies } from 'next/headers';

export async function setSecureCookie(name: string, value: string) {
  const cookieStore = cookies();
  await cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
  });
}

export async function getSecureCookie(name: string) {
  const cookieStore = cookies();
  return cookieStore.get(name);
}
