import { VirtualItem } from '@tanstack/react-virtual';

import { SpotifyPlaylist } from '@/lib/spotify/types';

export const calculateGridConfig = (width: number) => {
    const columnWidth = 200;
    const gap = 20;
    const containerPadding = 40;
    // Adjusted breakpoints for stricter column control
    if (width < 600) return { columnCount: 1, maxWidth: `${1 * (columnWidth + gap)}px` };
    if (width < 900) return { columnCount: 2, maxWidth: `${2 * (columnWidth + gap)}px` };
    if (width < 1100) return { columnCount: 3, maxWidth: `${3 * (columnWidth + gap)}px` };
    if (width < 1500) return { columnCount: 4, maxWidth: `${4 * (columnWidth + gap)}px` };
    if (width < 1800) return { columnCount: 5, maxWidth: `${5 * (columnWidth + gap)}px` };
    return { columnCount: 6, maxWidth: `${6 * (columnWidth + gap)}px` };
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