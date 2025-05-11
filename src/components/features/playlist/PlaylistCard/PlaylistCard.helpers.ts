import { SpotifyPlaylist } from '@/lib/spotify/types';

export const getCoverUrl = (playlist: SpotifyPlaylist): string => {
    return playlist.images && playlist.images.length > 0
        ? playlist.images[0].url
        : '/playlist-placeholder.png';
};
