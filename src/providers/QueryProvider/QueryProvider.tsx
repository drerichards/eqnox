'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    }));

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const persister = createSyncStoragePersister({
                storage: window.localStorage,
            });
            persistQueryClient({
                queryClient,
                persister,
            });
        }
    }, [queryClient]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Only include DevTools in development */}
            {process.env.NODE_ENV === 'development' &&
                <ReactQueryDevtools initialIsOpen={false} />
            }
        </QueryClientProvider>
    );
} 