const requiredEnvVars = {
  NEXT_SPOTIFY_CLIENT_ID: process.env.NEXT_SPOTIFY_CLIENT_ID,
  NEXT_SPOTIFY_CLIENT_SECRET: process.env.NEXT_SPOTIFY_CLIENT_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
} as const;

export function validateAuthEnv() {
  // Check if NEXT_SPOTIFY_CLIENT_ID is present and valid
  if (!process.env.NEXT_SPOTIFY_CLIENT_ID) {
    throw new Error('Missing required environment variable: NEXT_SPOTIFY_CLIENT_ID');
  }
  if (!/^[0-9a-f]{32}$/i.test(process.env.NEXT_SPOTIFY_CLIENT_ID)) {
    throw new Error('NEXT_SPOTIFY_CLIENT_ID should be a 32-character hex string');
  }

  // Check if NEXT_SPOTIFY_CLIENT_SECRET is present and valid
  if (!process.env.NEXT_SPOTIFY_CLIENT_SECRET) {
    throw new Error('Missing required environment variable: NEXT_SPOTIFY_CLIENT_SECRET');
  }
  if (!/^[0-9a-f]{32}$/i.test(process.env.NEXT_SPOTIFY_CLIENT_SECRET)) {
    throw new Error('NEXT_SPOTIFY_CLIENT_SECRET should be a 32-character hex string');
  }

  // Check if NEXTAUTH_URL is present and valid
  if (!process.env.NEXTAUTH_URL) {
    throw new Error('Missing required environment variable: NEXTAUTH_URL');
  }
  try {
    new URL(process.env.NEXTAUTH_URL);
  } catch {
    throw new Error('NEXTAUTH_URL must be a valid URL');
  }

  // Check if NEXTAUTH_SECRET is present and valid
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('Missing required environment variable: NEXTAUTH_SECRET');
  }
  if (process.env.NEXTAUTH_SECRET.length < 32) {
    throw new Error('NEXTAUTH_SECRET should be at least 32 characters long for security');
  }
}
