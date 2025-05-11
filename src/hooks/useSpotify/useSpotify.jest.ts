import { renderHook } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useSpotify } from './useSpotify';
import { SpotifyClient } from '@/lib/spotify/client/client';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

// Mock SpotifyClient
jest.mock('@/lib/spotify/client', () => ({
    SpotifyClient: jest.fn(),
}));

describe('when useSpotify is used', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return null when there is no session', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
        const { result } = renderHook(() => useSpotify());
        expect(result.current).toBeNull();
    });

    it('should return null when session has no access token', () => {
        (useSession as jest.Mock).mockReturnValue({ data: { accessToken: null } });
        const { result } = renderHook(() => useSpotify());
        expect(result.current).toBeNull();
    });

    it('should create and return a SpotifyClient when session has access token', () => {
        const mockAccessToken = 'test-access-token';
        const mockClient = new SpotifyClient(mockAccessToken);
        (SpotifyClient as jest.Mock).mockImplementation(() => mockClient);
        (useSession as jest.Mock).mockReturnValue({ data: { accessToken: mockAccessToken } });

        const { result } = renderHook(() => useSpotify());
        expect(result.current).toBe(mockClient);
        expect(SpotifyClient).toHaveBeenCalledWith(mockAccessToken);
    });

    it('should update client when session changes', () => {
        const mockAccessToken1 = 'test-access-token-1';
        const mockAccessToken2 = 'test-access-token-2';
        const mockClient1 = new SpotifyClient(mockAccessToken1);
        const mockClient2 = new SpotifyClient(mockAccessToken2);

        (SpotifyClient as jest.Mock)
            .mockImplementationOnce(() => mockClient1)
            .mockImplementationOnce(() => mockClient2);

        const { result, rerender } = renderHook(() => useSpotify());

        // Initial render with first token
        (useSession as jest.Mock).mockReturnValue({ data: { accessToken: mockAccessToken1 } });
        expect(result.current).toBe(mockClient1);

        // Rerender with second token
        (useSession as jest.Mock).mockReturnValue({ data: { accessToken: mockAccessToken2 } });
        rerender();
        expect(result.current).toBe(mockClient2);
    });
}); 