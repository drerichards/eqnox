import { ErrorInfo } from 'react';

export const getDerivedStateFromError = () => {
    return { hasError: true };
};

export const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Playlist error:', error, errorInfo);
};

export const getDefaultFallback = (onRetry: () => void) => (
    <div>
        <h2>Something went wrong loading your playlists.</h2>
        <button onClick={onRetry}>
            Try again
        </button>
    </div>
);