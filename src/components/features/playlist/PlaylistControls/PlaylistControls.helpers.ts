import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';

export const handleLimitChange = (
    router: ReturnType<typeof useRouter>,
    searchParams: ReturnType<typeof useSearchParams>,
    pathname: string
) => {
    return useDebouncedCallback((limit: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', limit);
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);
};

export const handleSortChange = (
    router: ReturnType<typeof useRouter>,
    searchParams: ReturnType<typeof useSearchParams>,
    pathname: string
) => {
    return useDebouncedCallback((sortBy: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sortBy', sortBy);
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);
};

export const handleSortOrderChange = (
    router: ReturnType<typeof useRouter>,
    searchParams: ReturnType<typeof useSearchParams>,
    pathname: string
) => {
    return useDebouncedCallback((sortOrder: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sortOrder', sortOrder);
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);
};
