import { ReadonlyURLSearchParams } from 'next/navigation';

export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  visiblePages: number = 5
) => {
  // visiblePages: total number of page buttons to show (including current)
  const delta = Math.floor(visiblePages / 2);
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

export const handlePageChange = (
  page: number,
  searchParams: ReadonlyURLSearchParams,
  pathname: string,
  router: { replace: (url: string) => void }
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set('page', page.toString());
  router.replace(`${pathname}?${params.toString()}`);
};

export const calculateTotalPages = (totalItems: number, itemsPerPage: number) => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const getCurrentPage = (searchParams: ReadonlyURLSearchParams) => {
  return Number(searchParams.get('page')) || 1;
};

export const shouldRenderPagination = (totalPages: number) => {
  return totalPages > 1;
};

export const isPageActive = (currentPage: number, page: number) => {
  return currentPage === page;
};

export const isPageDisabled = (
  currentPage: number,
  totalPages: number,
  direction: 'prev' | 'next'
) => {
  return direction === 'prev' ? currentPage === 1 : currentPage === totalPages;
};
