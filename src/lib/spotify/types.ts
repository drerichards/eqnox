export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyUser {
  display_name: string;
  id: string;
  images: SpotifyImage[];
  uri: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string | null;
  images: SpotifyImage[];
  owner: SpotifyUser;
  tracks: {
    total: number;
    href: string;
  };
  uri: string;
  public: boolean;
}

export interface SpotifyPaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  previous: string | null;
  next: string | null;
  href: string;
}

export type SpotifyPlaylistsResponse = SpotifyPaginatedResponse<SpotifyPlaylist>;
