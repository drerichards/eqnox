'use client';

import styled from 'styled-components';
import { FC, Suspense, useEffect } from 'react';
import { usePlaylists } from '@/hooks/usePlaylists';
import { useSearchParams, useRouter } from 'next/navigation';
import { useNetworkAwareLimit } from '@/hooks/useNetworkAwareLimit';
import { PlaylistErrorBoundary } from '@/components/PlaylistErrorBoundary';
import { PlaylistSkeletonGrid } from '@/components/PlaylistSkeletonGrid';
import { VirtualizedPlaylistGrid } from '@/components/VirtualizedPlaylistGrid';
import { PlaylistControls } from '@/components/PlaylistControls';

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

    const { playlists, isLoading, error, total } = usePlaylists({
        limit,
        offset
    });

    // Calculate max pages and redirect if current page is out of bounds
    useEffect(() => {
        const maxPages = Math.ceil(total / limit);
        if (total > 0 && page > maxPages) {
            const params = new URLSearchParams(searchParams);
            params.set('page', maxPages.toString());
            router.replace(`/user/library?${params.toString()}`);
        }
    }, [total, limit, page, router, searchParams]);

    return (
        <Container>
            <PlaylistErrorBoundary>
                <Suspense fallback={<PlaylistSkeletonGrid />}>
                    <PlaylistControls />
                    <VirtualizedPlaylistGrid
                        playlists={playlists}
                        isLoading={isLoading}
                        error={error}
                        totalItems={total}
                    />
                </Suspense>
            </PlaylistErrorBoundary>
        </Container>
    );
};

export default LibraryPage; 