import { VirtualItem } from '@tanstack/react-virtual';

import { SpotifyPlaylist } from '@/lib/spotify/types';

export const calculateGridConfig = (width: number) => {
    const columnWidth = 200;
    const gap = 20;
    const containerPadding = 40;
    const maxColumns = 6;
    const availableWidth = width - containerPadding;

    const columnCount = Math.min(
        maxColumns,
        Math.max(1, Math.floor(availableWidth / (columnWidth + gap)))
    );

    return {
        columnCount,
        maxWidth: `${columnCount * (columnWidth + gap)}px`,
    };
};

export const getRowCount = (playlists: SpotifyPlaylist[], columnCount: number) => {
    return Math.ceil(playlists.length / columnCount);
};

export const getVirtualRowItems = (
    virtualRow: { index: number },
    columnCount: number,
    playlists: SpotifyPlaylist[]
) => {
    const startIndex = virtualRow.index * columnCount;
    return playlists.slice(startIndex, startIndex + columnCount);
};

export const getRowStyle = (virtualRow: VirtualItem, rowHeight: number, columnCount: number) => ({
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: `${rowHeight}px`,
    transform: `translateY(${virtualRow.start}px)`,
    display: 'grid',
    gridTemplateColumns: `repeat(${columnCount}, 200px)`,
    gap: '40px 20px',
    justifyContent: 'center'
});

export const getCardWrapperStyle = (index: number, showLimitChange: boolean) => ({
    animationDelay: showLimitChange ? `${index * 30}ms` : '0ms'
});

export const handleLimitChange = (
    prevLimit: number,
    currentLength: number,
    setPrevLimit: (limit: number) => void,
    setShowLimitChange: (show: boolean) => void
) => {
    if (prevLimit !== currentLength) {
        setShowLimitChange(true);
        setPrevLimit(currentLength);
        return true;
    }
    return false;
}; 