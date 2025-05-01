'use client';

import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styled from 'styled-components';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useState, useEffect } from 'react';

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SortSelect = styled.select`
  background: rgba(30, 41, 59, 0.5);
  color: white;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 0.5rem;
  cursor: pointer;
`;

const LimitSelect = styled.select`
  appearance: none;
  background: rgba(30, 41, 59, 0.6);
  color: white;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.1),
    0 4px 16px -8px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 0.75rem) center;

  &:hover {
    background-color: rgba(30, 41, 59, 0.7);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.15),
      0 8px 24px -8px rgba(0, 0, 0, 0.25),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.15),
      0 8px 24px -8px rgba(0, 0, 0, 0.25),
      0 0 0 3px rgba(59, 130, 246, 0.25),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  option {
    background: #1e293b;
    color: white;
    padding: 8px;
  }
`;

export function PlaylistControls() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [limitOptions] = useState([24, 36, 48]); // Simplified options

    const handleLimitChange = useDebouncedCallback((limit: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('limit', limit);
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    // Default to 24 if no limit is set
    const currentLimit = Number(searchParams.get('limit')) || 24;

    return (
        <Controls>
            <LimitSelect
                value={currentLimit}
                onChange={(e) => handleLimitChange(e.target.value)}
            >
                {limitOptions.map(limit => (
                    <option key={limit} value={limit}>
                        {limit} playlists
                    </option>
                ))}
            </LimitSelect>
        </Controls>
    );
} 