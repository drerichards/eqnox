import { Grid, SkeletonCard } from './PlaylistSkeletonGrid.styles';
import { generateSkeletonCards } from './PlaylistSkeletonGrid.helpers';

// Match the default limit from PlaylistGrid
const DEFAULT_PLAYLIST_LIMIT = 24;

interface PlaylistSkeletonGridProps {
  count?: number;
}

export function PlaylistSkeletonGrid({ count = DEFAULT_PLAYLIST_LIMIT }: PlaylistSkeletonGridProps) {
  const skeletonCards = generateSkeletonCards(count);

  return (
    <Grid>
      {skeletonCards.map(({ id }) => (
        <SkeletonCard key={id} />
      ))}
    </Grid>
  );
} 