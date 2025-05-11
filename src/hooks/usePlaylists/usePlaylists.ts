'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SpotifyPlaylist, SpotifyPlaylistsResponse } from '@/lib/spotify/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SORT_OPTIONS, SORT_ORDER } from '@/lib/constants';

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

const fetchAllPlaylists = async (accessToken: string): Promise<SpotifyPlaylist[]> => {
  let allPlaylists: SpotifyPlaylist[] = [];
  let nextUrl: string | null = 'https://api.spotify.com/v1/me/playlists?limit=50';

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) throw new Error('Failed to fetch playlists');
    const data: SpotifyPlaylistsResponse = await response.json();

    allPlaylists = [...allPlaylists, ...data.items];
    nextUrl = data.next;
  }

  return allPlaylists;
};

const sortPlaylists = (playlists: SpotifyPlaylist[], sortBy: string, sortOrder: string) => {
  // If default sort, return playlists in their original order
  if (sortBy === SORT_OPTIONS.DEFAULT) {
    return playlists;
  }

  return [...playlists].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case SORT_OPTIONS.ALPHABETICAL:
        comparison = a.name.localeCompare(b.name);
        break;
      case SORT_OPTIONS.TRACK_COUNT:
        comparison = a.tracks.total - b.tracks.total;
        break;
      case SORT_OPTIONS.LAST_UPDATED:
        // Use the most recent image update time as a proxy for last updated
        const aTime = a.images?.[0]?.url ? new Date(a.images[0].url.split('?')[0]).getTime() : 0;
        const bTime = b.images?.[0]?.url ? new Date(b.images[0].url.split('?')[0]).getTime() : 0;
        comparison = aTime - bTime;
        break;
      default:
        comparison = 0;
    }

    return sortOrder === SORT_ORDER.DESC ? -comparison : comparison;
  });
};

export function usePlaylists({
  limit = 24,
  offset = 0,
  sortBy = SORT_OPTIONS.DEFAULT,
  sortOrder = SORT_ORDER.ASC
}: UsePlaylistsOptions = {}): UsePlaylistsReturn {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const queryKey = ['playlists', { sortBy, sortOrder }];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!session?.accessToken) {
        throw new Error('Not authenticated');
      }

      const allPlaylists = await fetchAllPlaylists(session.accessToken);
      const sortedPlaylists = sortPlaylists(allPlaylists, sortBy, sortOrder);

      return {
        items: sortedPlaylists,
        total: sortedPlaylists.length
      };
    },
    staleTime: 30 * 60 * 1000, // Data considered fresh for 30 minutes
    gcTime: 60 * 60 * 1000, // Keep in cache for 1 hour
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch when component mounts
    refetchOnReconnect: false, // Don't refetch when reconnecting
  });

  // Get the paginated slice of playlists
  const paginatedPlaylists = data?.items.slice(offset, offset + limit) ?? [];
  const total = data?.total ?? 0;

  return {
    playlists: paginatedPlaylists,
    isLoading,
    error: error ? String(error) : null,
    total,
  };
}
