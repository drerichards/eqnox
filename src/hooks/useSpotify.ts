'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SpotifyClient } from '@/lib/spotify/client';

export function useSpotify() {
  const { data: session } = useSession();
  const [client, setClient] = useState<SpotifyClient | null>(null);

  useEffect(() => {
    if (session?.accessToken) {
      setClient(new SpotifyClient(session.accessToken as string));
    }
  }, [session]);

  return client;
}
