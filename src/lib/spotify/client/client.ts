const NEXT_SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export class SpotifyClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${NEXT_SPOTIFY_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Playlists
  async getUserPlaylists(params?: { limit?: number; offset?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const queryString = queryParams.toString();
    const url = `/me/playlists${queryString ? `?${queryString}` : ''}`;

    console.log('Making API request to:', url);
    return this.fetch(url);
  }

  async getPlaylist(playlistId: string) {
    return this.fetch(`/playlists/${playlistId}`);
  }

  // Player
  async getCurrentPlayback() {
    return this.fetch('/me/player');
  }

  async play(deviceId?: string) {
    return this.fetch('/me/player/play', {
      method: 'PUT',
      ...(deviceId && {
        body: JSON.stringify({ device_id: deviceId }),
      }),
    });
  }

  async pause() {
    return this.fetch('/me/player/pause', { method: 'PUT' });
  }

  async nextTrack() {
    return this.fetch('/me/player/next', { method: 'POST' });
  }

  async previousTrack() {
    return this.fetch('/me/player/previous', { method: 'POST' });
  }

  // Library
  async getSavedTracks() {
    return this.fetch('/me/tracks');
  }

  async getTopTracks() {
    return this.fetch('/me/top/tracks');
  }

  async getTopArtists() {
    return this.fetch('/me/top/artists');
  }
}
