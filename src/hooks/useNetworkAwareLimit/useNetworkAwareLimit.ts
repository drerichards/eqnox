import { useState, useEffect } from 'react';

export function useNetworkAwareLimit(defaultLimit = 24) {
    const [limit, setLimit] = useState(defaultLimit);

    useEffect(() => {
        const connection = (navigator as any).connection;

        const updateLimit = () => {
            if (!connection) return;

            // Adjust limit based on network conditions but don't exceed default
            if (connection.effectiveType === '4g') {
                setLimit(defaultLimit); // Use the default limit instead of 50
            } else if (connection.effectiveType === '3g') {
                setLimit(Math.min(20, defaultLimit));
            } else {
                setLimit(Math.min(10, defaultLimit));
            }
        };

        if (connection) {
            connection.addEventListener('change', updateLimit);
            updateLimit();
        }

        return () => {
            if (connection) {
                connection.removeEventListener('change', updateLimit);
            }
        };
    }, [defaultLimit]); // Add defaultLimit to dependencies

    return limit;
} 