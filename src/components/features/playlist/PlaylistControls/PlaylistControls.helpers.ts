import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';


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
