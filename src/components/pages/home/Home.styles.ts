'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';

export const MainContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const ContentContainer = styled.div`
  text-align: center;
  max-width: 600px;
`;

export const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #4682b4, #87ceeb);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #94a3b8;
  margin-bottom: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const buttonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  border: none;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const PrimaryButton = styled.button`
  ${buttonStyles}
`;

export const PrimaryButtonLink = styled(Link)`
  ${buttonStyles}
  text-decoration: none;
  white-space: nowrap;
`;

export const SecondaryButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  font-family: var(--font-mulish);
  font-weight: 600;
  background: transparent;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #374151;

    &:hover {
      background-color: #1f2937;
    }
  }
`;
