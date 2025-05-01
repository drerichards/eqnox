import { act, renderHook } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { SpotifyPlaylist, SpotifyPlaylistsResponse } from '@/lib/spotify/types';
import { usePlaylists } from '../usePlaylists';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

global.fetch = jest.fn();

const MOCK_PLAYLISTS: SpotifyPlaylist[] = [
  {
    id: '1',
    name: 'Playlist 1',
    description: 'Test playlist 1',
    images: [],
    owner: {
      display_name: 'Test User',
      id: 'user1',
      images: [],
      uri: 'spotify:user:user1',
    },
    tracks: {
      total: 0,
      href: 'https://api.spotify.com/v1/playlists/1/tracks',
    },
    uri: 'spotify:playlist:1',
    public: true,
  },
  {
    id: '2',
    name: 'Playlist 2',
    description: 'Test playlist 2',
    images: [],
    owner: {
      display_name: 'Test User',
      id: 'user1',
      images: [],
      uri: 'spotify:user:user1',
    },
    tracks: {
      total: 0,
      href: 'https://api.spotify.com/v1/playlists/2/tracks',
    },
    uri: 'spotify:playlist:2',
    public: true,
  },
];

const MOCK_RESPONSE: SpotifyPlaylistsResponse = {
  items: MOCK_PLAYLISTS,
  total: MOCK_PLAYLISTS.length,
  limit: 50,
  offset: 0,
  previous: null,
  next: null,
  href: 'https://api.spotify.com/v1/me/playlists',
};

describe('usePlaylists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('when user is not authenticated, it returns empty playlists', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    const { result } = renderHook(() => usePlaylists());

    expect(result.current.playlists).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('when fetching playlists succeeds, it returns the playlists', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { accessToken: 'mock-token' },
      status: 'authenticated',
    });
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(MOCK_RESPONSE),
      text: () => Promise.resolve(''),
    });

    const { result } = renderHook(() => usePlaylists());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.playlists).toEqual(MOCK_PLAYLISTS);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('when API returns an error, it handles the error correctly', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { accessToken: 'mock-token' },
      status: 'authenticated',
    });
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
      text: () => Promise.resolve('Unauthorized'),
    });

    const { result } = renderHook(() => usePlaylists());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.playlists).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch playlists: Unauthorized');
  });

  test('when network request fails, it handles the error correctly', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { accessToken: 'mock-token' },
      status: 'authenticated',
    });
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => usePlaylists());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.playlists).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network error');
  });

  test('when error is not an instance of Error, it returns a generic error message', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { accessToken: 'mock-token' },
      status: 'authenticated',
    });
    (global.fetch as jest.Mock).mockRejectedValueOnce('Unknown error');

    const { result } = renderHook(() => usePlaylists());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.playlists).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('An unknown error occurred');
  });
});
