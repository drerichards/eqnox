'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { PaginationContainer, PageButton, Ellipsis } from './PaginationControls.styles';
import {
    getVisiblePages,
    handlePageChange,
    calculateTotalPages,
    getCurrentPage,
    shouldRenderPagination,
    isPageActive,
    isPageDisabled
} from './PaginationControls.helpers';

interface PaginationControlsProps {
    totalItems: number;
    itemsPerPage: number;
}

export function PaginationControls({ totalItems, itemsPerPage }: PaginationControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentPage = getCurrentPage(searchParams);
    const totalPages = calculateTotalPages(totalItems, itemsPerPage);

    if (!shouldRenderPagination(totalPages)) return null;

    return (
        <PaginationContainer>
            <PageButton
                onClick={() => handlePageChange(currentPage - 1, searchParams, pathname, router)}
                disabled={isPageDisabled(currentPage, totalPages, 'prev')}
            >
                ←
            </PageButton>

            {getVisiblePages(currentPage, totalPages).map((page, index) => (
                typeof page === 'number' ? (
                    <PageButton
                        key={index}
                        onClick={() => handlePageChange(page, searchParams, pathname, router)}
                        $active={isPageActive(currentPage, page)}
                    >
                        {page}
                    </PageButton>
                ) : (
                    <Ellipsis key={index}>
                        {page}
                    </Ellipsis>
                )
            ))}

            <PageButton
                onClick={() => handlePageChange(currentPage + 1, searchParams, pathname, router)}
                disabled={isPageDisabled(currentPage, totalPages, 'next')}
            >
                →
            </PageButton>
        </PaginationContainer>
    );
}