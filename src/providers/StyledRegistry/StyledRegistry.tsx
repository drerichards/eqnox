'use client';

import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyle } from '@/styles/base';

export default function StyledRegistry({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      {children}
    </StyledComponentsRegistry>
  );
}
