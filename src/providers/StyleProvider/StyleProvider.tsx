'use client';

import { createGlobalStyle } from 'styled-components';
import StyledComponentsRegistry from '@/lib/registry/registry';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-mulish: 'Mulish', sans-serif;
    --background-base: #0f1115;
    --background-primary: #1e293b;
    --background-gradient-start: #233043;
    --background-gradient-end: #151b26;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-mulish);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(180deg, 
      var(--background-gradient-start) 0%,
      var(--background-gradient-end) 100%
    );
    color: #ffffff;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }
`;

export default function StyleProvider({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      {children}
    </StyledComponentsRegistry>
  );
}
