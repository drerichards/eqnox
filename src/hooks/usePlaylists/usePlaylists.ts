'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SpotifyPlaylist, SpotifyPlaylistsResponse } from '@/lib/spotify/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface UsePlaylistsOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: string;
}

interface UsePlaylistsReturn {
  playlists: SpotifyPlaylist[];
  isLoading: boolean;
  error: string | null;
  total: number;
}

const fetchPlaylists = async ({ limit, offset }: UsePlaylistsOptions) => {
  const { data: session } = useSession();
  if (!session?.accessToken) throw new Error('Not authenticated');
  const response = await fetch(
    `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
    {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    }
  );
  if (!response.ok) throw new Error('Failed to fetch playlists');
  return response.json();
};

export function usePlaylists({
  limit = 24,
  offset = 0,
  sortBy = 'name',
  sortOrder = 'asc'
}: UsePlaylistsOptions = {}): UsePlaylistsReturn {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const queryKey = ['playlists', { limit, offset, sortBy, sortOrder }];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!session?.accessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (!response.ok) throw new Error('Failed to fetch playlists');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    placeholderData: (previousData) => previousData,
  });

  // Prefetch next page
  useEffect(() => {
    if (data?.next) {
      const nextOffset = offset + limit;
      queryClient.prefetchQuery({
        queryKey: ['playlists', { limit, offset: nextOffset, sortBy, sortOrder }],
        queryFn: () => fetchPlaylists({ limit, offset: nextOffset }),
      });
    }
  }, [offset, limit, data?.next, queryClient]);

  return {
    playlists: data?.items ?? [],
    isLoading,
    error: error ? String(error) : null,
    total: data?.total ?? 0,
  };
}
