'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Controls, LimitSelect } from './PlaylistControls.styles';
import { handleLimitChange } from './PlaylistControls.helpers';
import { DEFAULT_LIMIT, LIMIT_OPTIONS } from '@/lib/constants';

export function PlaylistControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onLimitChange = handleLimitChange(router, searchParams, pathname);
  const currentLimit = Number(searchParams.get('limit')) || DEFAULT_LIMIT;

  return (
    <Controls>
      <LimitSelect
        value={currentLimit}
        onChange={(e) => onLimitChange(e.target.value)}
      >
        {LIMIT_OPTIONS.map(limit => (
          <option key={limit} value={limit}>
            {limit} playlists
          </option>
        ))}
      </LimitSelect>
    </Controls>
  );
} 