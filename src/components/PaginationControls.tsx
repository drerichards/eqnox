'use client';

import styled from 'styled-components';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 0;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ?
        'linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)' :
        'rgba(30, 41, 59, 0.6)'};
  color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid ${props => props.$active ?
        'rgba(59, 130, 246, 0.3)' :
        'rgba(255, 255, 255, 0.1)'};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  min-width: 40px;
  font-family: var(--font-mulish);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.1),
    0 4px 16px -8px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    background: ${props => props.$active ?
        'linear-gradient(180deg, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.15) 100%)' :
        'rgba(30, 41, 59, 0.7)'};
    border-color: ${props => props.$active ?
        'rgba(59, 130, 246, 0.4)' :
        'rgba(255, 255, 255, 0.15)'};
    transform: translateY(-1px);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.15),
      0 8px 24px -8px rgba(0, 0, 0, 0.25),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    &:hover {
      background: rgba(30, 41, 59, 0.6);
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.1),
        0 4px 16px -8px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Ellipsis = styled.span`
  color: rgba(255, 255, 255, 0.6);
  padding: 0 0.5rem;
  font-size: 0.875rem;
`;

interface PaginationControlsProps {
    totalItems: number;
    itemsPerPage: number;
}

export function PaginationControls({ totalItems, itemsPerPage }: PaginationControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.replace(`${pathname}?${params.toString()}`);
    };

    const getVisiblePages = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        let rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots = [...rangeWithDots, ...range];

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots = [...rangeWithDots, '...', totalPages];
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    return (
        <PaginationContainer>
            <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ←
            </PageButton>

            {getVisiblePages().map((page, index) => (
                typeof page === 'number' ? (
                    <PageButton
                        key={index}
                        onClick={() => handlePageChange(page)}
                        $active={currentPage === page}
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
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                →
            </PageButton>
        </PaginationContainer>
    );
} 