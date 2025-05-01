'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useWindowSize } from '@/hooks/useWindowSize';
import { PlaylistCard } from '@/components/PlaylistCard';
import { useCallback, useRef, useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { SpotifyPlaylist } from '@/lib/spotify/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useSearchParams } from 'next/navigation';
import { PaginationControls } from '@/components/PaginationControls';

interface VirtualizedPlaylistGridProps {
    playlists: SpotifyPlaylist[];
    isLoading: boolean;
    error: string | null;
    rowHeight?: number;
    totalItems: number;
}

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  position: relative;
  background: var(--background-primary, #1e293b); // Default dark mode color
`;

const GridContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 20px;
  padding-bottom: 80px;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.2);
    border-radius: 4px;
    
    &:hover {
      background: rgba(148, 163, 184, 0.3);
    }
  }
`;

const PaginationWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    rgba(30, 41, 59, 0) 0%,
    rgba(30, 41, 59, 0.8) 20%,
    rgba(30, 41, 59, 0.95) 50%,
    rgba(30, 41, 59, 1) 100%
  );
  padding: 20px 0;
  margin-top: -60px;
  z-index: 10;
`;

const flashHighlight = keyframes`
  0% { background-color: rgba(70, 130, 180, 0); }
  50% { background-color: rgba(70, 130, 180, 0.1); }
  100% { background-color: rgba(70, 130, 180, 0); }
`;

const GridContent = styled.div<{ $maxWidth: string; $isLimitChange: boolean }>`
  position: relative;
  width: 100%;
  max-width: ${props => props.$maxWidth};
  margin: 0 auto;
  animation: ${props => props.$isLimitChange ? flashHighlight : 'none'} 0.5s ease;
`;

const PlaylistCardWrapper = styled.div`
  width: 200px;
  height: 280px;
  position: relative;
  isolation: isolate;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PageButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'rgba(148, 163, 184, 0.2)' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : 'rgba(148, 163, 184, 0.8)'};
  border: 1px solid ${props => props.$active ? 'rgba(148, 163, 184, 0.4)' : 'rgba(148, 163, 184, 0.1)'};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  font-family: var(--font-mulish);

  &:hover {
    background: rgba(148, 163, 184, 0.15);
    border-color: rgba(148, 163, 184, 0.3);
    color: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: transparent;
      border-color: rgba(148, 163, 184, 0.1);
      color: rgba(148, 163, 184, 0.8);
    }
  }
`;

const Ellipsis = styled.span`
  color: rgba(148, 163, 184, 0.8);
  padding: 0 0.5rem;
`;

const GlobalStyle = createGlobalStyle`
  :root {
    --background-primary: #1e293b;
    --background-secondary: #0f172a;
    --text-primary: #ffffff;
    --text-secondary: rgba(148, 163, 184, 0.8);
    --border-color: rgba(148, 163, 184, 0.1);
    --hover-color: rgba(148, 163, 184, 0.15);
    --active-color: rgba(148, 163, 184, 0.2);
  }

  [data-theme="light"] {
    --background-primary: #f8fafc;
    --background-secondary: #f1f5f9;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: rgba(30, 41, 59, 0.1);
    --hover-color: rgba(30, 41, 59, 0.05);
    --active-color: rgba(30, 41, 59, 0.1);
  }
`;

export function VirtualizedPlaylistGrid({
    playlists,
    isLoading,
    error,
    rowHeight = 320,
    totalItems
}: VirtualizedPlaylistGridProps) {
    const { width } = useWindowSize();
    const parentRef = useRef<HTMLDivElement>(null);
    const [gridConfig, setGridConfig] = useState({
        columnCount: 4, // Default column count
        maxWidth: '880px', // Default max width (4 columns * 220px)
    });
    const [prevLimit, setPrevLimit] = useState(playlists.length);
    const [showLimitChange, setShowLimitChange] = useState(false);
    const searchParams = useSearchParams();
    const currentLimit = Number(searchParams.get('limit')) || 24;

    useEffect(() => {
        const columnWidth = 200;
        const gap = 20;
        const containerPadding = 40;
        const maxColumns = 6;
        const availableWidth = width - containerPadding;

        const columnCount = Math.min(
            maxColumns,
            Math.max(1, Math.floor(availableWidth / (columnWidth + gap)))
        );

        setGridConfig({
            columnCount,
            maxWidth: `${columnCount * (columnWidth + gap)}px`,
        });
    }, [width]);

    useEffect(() => {
        if (prevLimit !== playlists.length) {
            setShowLimitChange(true);
            setPrevLimit(playlists.length);

            // Reset the animation flag after animation completes
            const timer = setTimeout(() => {
                setShowLimitChange(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [playlists.length, prevLimit]);

    const rowCount = Math.ceil(playlists.length / gridConfig.columnCount);

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
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const startIndex = virtualRow.index * gridConfig.columnCount;
                        const items = playlists.slice(
                            startIndex,
                            startIndex + gridConfig.columnCount
                        );

                        return (
                            <div
                                key={virtualRow.index}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${rowHeight}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${gridConfig.columnCount}, 200px)`,
                                    gap: '40px 20px',
                                    justifyContent: 'center'
                                }}
                            >
                                {items.map((playlist, index) => (
                                    <PlaylistCardWrapper
                                        key={playlist.id}
                                        style={{
                                            animationDelay: showLimitChange ? `${index * 30}ms` : '0ms'
                                        }}
                                    >
                                        <PlaylistCard playlist={playlist} />
                                    </PlaylistCardWrapper>
                                ))}
                            </div>
                        );
                    })}
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