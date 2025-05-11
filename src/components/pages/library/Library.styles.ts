'use client';

import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 6rem;
  overflow: hidden;
  font-family: var(--font-mulish);
`;

export const ContentContainer = styled.div`
  z-index: 10;
  max-width: 64rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 2rem;
  font-family: var(--font-mulish);
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Card = styled.div`
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: border-color 0.2s;
  font-family: var(--font-mulish);

  p {
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #374151;
  }
`;
