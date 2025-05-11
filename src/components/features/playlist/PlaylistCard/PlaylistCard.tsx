import Image from 'next/image';
import { SpotifyPlaylist } from '@/lib/spotify/types';
import { Card, ImageContainer, PlaylistInfo, PlaylistName, TrackCount } from './PlaylistCard.styles';
import { getCoverUrl } from './PlaylistCard.helpers';
import React from 'react';

interface PlaylistCardProps {
  playlist: SpotifyPlaylist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const coverUrl = getCoverUrl(playlist);
  // State to track if the image failed to load
  const [imgSrc, setImgSrc] = React.useState(coverUrl);

  return (
    <Card>
      <ImageContainer>
        <Image
          src={imgSrc}
          alt={`${playlist.name} cover`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="200px"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMjQ4ODg8QEBAQD88RUxUVHp6fYKDhIWGkY6OmZ6inf/2wBDARUXFyIcIhwaGhp5eVl6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          onError={() => setImgSrc('/playlist-placeholder.png')}
        />
      </ImageContainer>
      <PlaylistInfo>
        <PlaylistName>{playlist.name}</PlaylistName>
        <TrackCount>{playlist.tracks.total} tracks</TrackCount>
      </PlaylistInfo>
    </Card>
  );
} 