'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useWindowSize } from '@/hooks/useWindowSize/useWindowSize';
import { PlaylistCard } from '@/components/features/playlist/PlaylistCard/PlaylistCard';
import { useCallback, useRef, useState, useEffect } from 'react';
import { SpotifyPlaylist } from '@/lib/spotify/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { useSearchParams } from 'next/navigation';
import { PaginationControls } from '@/components/features/pagination/PaginationControls/PaginationControls';
import { GridWrapper, GridContainer, GridContent, PlaylistCardWrapper, PaginationWrapper } from './PlaylistGrid.styles';
import {
  calculateGridConfig,
  getCardWrapperStyle,
  getRowCount,
  getRowStyle,
  getVirtualRowItems,
  handleLimitChange
} from './PlaylistGrid.helpers';

interface PlaylistGridProps {
  playlists: SpotifyPlaylist[];
  isLoading: boolean;
  error: string | null;
  rowHeight?: number;
  totalItems: number;
  columnCount: number;
}

export function PlaylistGrid({
  playlists,
  isLoading,
  error,
  rowHeight = 320,
  totalItems
}: PlaylistGridProps) {
  const { width } = useWindowSize();
  const parentRef = useRef<HTMLDivElement>(null);
  const [gridConfig, setGridConfig] = useState(calculateGridConfig(width));
  const [prevLimit, setPrevLimit] = useState(playlists.length);
  const [showLimitChange, setShowLimitChange] = useState(false);
  const searchParams = useSearchParams();
  const currentLimit = Number(searchParams.get('limit')) || 24;

  useEffect(() => {
    setGridConfig(calculateGridConfig(width));
  }, [width]);

  useEffect(() => {
    if (handleLimitChange(prevLimit, playlists.length, setPrevLimit, setShowLimitChange)) {
      const timer = setTimeout(() => setShowLimitChange(false), 500);
      return () => clearTimeout(timer);
    }
  }, [playlists.length, prevLimit]);

  const rowCount = getRowCount(playlists, gridConfig.columnCount);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5,
  });

  return (
    <GridWrapper>
      <LoadingSpinner isVisible={isLoading} />
      <GridContainer ref={parentRef}>
        <GridContent
          $maxWidth={gridConfig.maxWidth}
          $isLimitChange={showLimitChange}
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              style={getRowStyle(virtualRow, rowHeight, gridConfig.columnCount)}
            >
              {getVirtualRowItems(virtualRow, gridConfig.columnCount, playlists)
                .map((playlist, index) => (
                  <PlaylistCardWrapper
                    key={playlist.id}
                    style={getCardWrapperStyle(index, showLimitChange)}
                  >
                    <PlaylistCard playlist={playlist} />
                  </PlaylistCardWrapper>
                ))}
            </div>
          ))}
        </GridContent>
      </GridContainer>
      <PaginationWrapper>
        <PaginationControls
          totalItems={totalItems}
          itemsPerPage={currentLimit}
        />
      </PaginationWrapper>
    </GridWrapper>
  );
}

