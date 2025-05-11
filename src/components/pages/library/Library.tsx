'use client';

import styled from 'styled-components';
import { FC, Suspense, useEffect } from 'react';
import { usePlaylists } from '@/hooks/usePlaylists/usePlaylists';
import { useSearchParams, useRouter } from 'next/navigation';
import { useNetworkAwareLimit } from '@/hooks/useNetworkAwareLimit/useNetworkAwareLimit';
import { PlaylistErrorBoundary } from '@/components/features/playlist/PlaylistErrorBoundary/PlaylistErrorBoundary';
import { PlaylistSkeletonGrid } from '@/components/features/playlist/PlaylistSkeletonGrid/PlaylistSkeletonGrid';
import { PlaylistGrid } from '@/components/features/playlist/PlaylistGrid/PlaylistGrid';
import { PlaylistControls } from '@/components/features/playlist/PlaylistControls/PlaylistControls';
import { SORT_OPTIONS, SORT_ORDER } from '@/lib/constants';
import { useWindowSize } from '@/hooks/useWindowSize/useWindowSize';
import { calculateGridConfig } from '@/components/features/playlist/PlaylistGrid/PlaylistGrid.helpers';

const Container = styled.div`
  padding: 2rem;
  margin-top: 64px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const LibraryPage: FC = () => {
    const router = useRouter();
    const networkAwareLimit = useNetworkAwareLimit();
    const searchParams = useSearchParams();
    const limit = Number(searchParams.get('limit')) || networkAwareLimit;
    const page = Number(searchParams.get('page')) || 1;
    const offset = (page - 1) * limit;
    const sortBy = searchParams.get('sortBy') || SORT_OPTIONS.DEFAULT;
    const sortOrder = searchParams.get('sortOrder') || SORT_ORDER.ASC;

    const { playlists, isLoading, error, total } = usePlaylists({
        limit,
        offset,
        sortBy,
        sortOrder
    });

    const { width } = useWindowSize();
    const { columnCount } = calculateGridConfig(width);

    // Calculate max pages and redirect if current page is out of bounds
    useEffect(() => {
        const maxPages = Math.ceil(total / limit);
        if (total > 0 && page > maxPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', maxPages.toString());
            router.replace(`/user/library?${params.toString()}`);
        }
    }, [total, limit, page, router, searchParams]);

    return (
        <Container>
            <PlaylistErrorBoundary>
                <Suspense fallback={<PlaylistSkeletonGrid />}>
                    <PlaylistControls columnCount={columnCount} />
                    <PlaylistGrid
                        playlists={playlists}
                        isLoading={isLoading}
                        error={error}
                        totalItems={total}
                        columnCount={columnCount}
                    />
                </Suspense>
            </PlaylistErrorBoundary>
        </Container>
    );
};

export default LibraryPage; 