import { SpotifyClient } from '../client/client';

describe('SpotifyClient', () => {
  let client: SpotifyClient;
  const mockAccessToken = 'mock-access-token';

  beforeEach(() => {
    client = new SpotifyClient(mockAccessToken);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockSuccessResponse = {
    ok: true,
    json: () => Promise.resolve({ data: 'test' })
  };

  const mockErrorResponse = {
    ok: false,
    statusText: 'Not Found'
  };

  describe('fetch', () => {
    it('should make a request with correct headers', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);

      await client.getUserPlaylists();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/playlists',
        expect.objectContaining({
          headers: {
            Authorization: `Bearer ${mockAccessToken}`,
            'Content-Type': 'application/json'
          }
        })
      );
    });

    it('should throw error on unsuccessful response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockErrorResponse);

      await expect(client.getUserPlaylists()).rejects.toThrow('Spotify API error: Not Found');
    });
  });

  describe('playlists', () => {
    it('should get user playlists', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.getUserPlaylists();
      expect(result).toEqual({ data: 'test' });
    });

    it('should get a specific playlist', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.getPlaylist('123');
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/playlists/123',
        expect.any(Object)
      );
    });
  });

  describe('player', () => {
    it('should get current playback', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.getCurrentPlayback();
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/player',
        expect.any(Object)
      );
    });

    it('should play without device ID', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.play();
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/player/play',
        expect.objectContaining({
          method: 'PUT'
        })
      );
    });

    it('should play with device ID', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.play('device123');
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/player/play',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ device_id: 'device123' })
        })
      );
    });

    it('should pause playback', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.pause();
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/player/pause',
        expect.objectContaining({
          method: 'PUT'
        })
      );
    });

    it('should skip to next track', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.nextTrack();
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/player/next',
        expect.objectContaining({
          method: 'POST'
        })
      );
    });

    it('should go to previous track', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.previousTrack();
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/player/previous',
        expect.objectContaining({
          method: 'POST'
        })
      );
    });
  });

  describe('library', () => {
    it('should get saved tracks', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.getSavedTracks();
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/tracks',
        expect.any(Object)
      );
    });

    it('should get top tracks', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.getTopTracks();
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/top/tracks',
        expect.any(Object)
      );
    });

    it('should get top artists', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
      const result = await client.getTopArtists();
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/top/artists',
        expect.any(Object)
      );
    });
  });
});
