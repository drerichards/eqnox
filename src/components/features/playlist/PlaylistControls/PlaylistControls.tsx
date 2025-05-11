'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Controls, LimitSelect, SortSelect, SortOrderSelect } from './PlaylistControls.styles';
import { handleLimitChange, handleSortChange, handleSortOrderChange } from './PlaylistControls.helpers';
import { DEFAULT_LIMIT, LIMIT_OPTIONS, SORT_OPTIONS, SORT_ORDER, SORT_LABELS } from '@/lib/constants';
import { useMemo, useEffect, useState } from 'react';

const SORT_ORDER_LABELS_DYNAMIC = {
  [SORT_OPTIONS.ALPHABETICAL]: {
    [SORT_ORDER.ASC]: 'A–Z',
    [SORT_ORDER.DESC]: 'Z–A',
  },
  [SORT_OPTIONS.TRACK_COUNT]: {
    [SORT_ORDER.ASC]: 'Fewest',
    [SORT_ORDER.DESC]: 'Most',
  },
  [SORT_OPTIONS.LAST_UPDATED]: {
    [SORT_ORDER.ASC]: 'Oldest',
    [SORT_ORDER.DESC]: 'Newest',
  },
};

export function PlaylistControls({ columnCount }: { columnCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const onLimitChange = handleLimitChange(router, searchParams, pathname);
  const onSortChange = handleSortChange(router, searchParams, pathname);
  const onSortOrderChange = handleSortOrderChange(router, searchParams, pathname);

  const currentLimit = Number(searchParams.get('limit')) || DEFAULT_LIMIT;
  const currentSort = searchParams.get('sortBy') || SORT_OPTIONS.DEFAULT;
  const currentSortOrder = searchParams.get('sortOrder') || SORT_ORDER.ASC;

  // Dynamically get sort order labels based on current sort type
  const sortOrderOptions = useMemo(() => {
    if (currentSort === SORT_OPTIONS.DEFAULT) return [];
    const labels = SORT_ORDER_LABELS_DYNAMIC[currentSort as keyof typeof SORT_ORDER_LABELS_DYNAMIC];
    return labels
      ? Object.entries(labels).map(([value, label]) => ({ value, label }))
      : [];
  }, [currentSort]);

  const limitOptions = useMemo(() => {
    if (!columnCount) return [];
    return [4, 6, 8].map(multiplier => columnCount * multiplier);
  }, [columnCount]);

  // Only render the controls after mount
  if (!hasMounted) return null;

  return (
    <Controls>
      <LimitSelect
        value={currentLimit}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onLimitChange(e.target.value)}
      >
        {limitOptions.map(limit => (
          <option key={limit} value={limit}>
            {limit} playlists
          </option>
        ))}
      </LimitSelect>

      <SortSelect
        value={currentSort}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value)}
      >
        {Object.entries(SORT_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SortSelect>

      {currentSort !== SORT_OPTIONS.DEFAULT && sortOrderOptions.length > 0 && (
        <SortOrderSelect
          value={currentSortOrder}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortOrderChange(e.target.value)}
        >
          {sortOrderOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SortOrderSelect>
      )}
    </Controls>
  );
} 