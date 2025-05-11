import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  position: relative;
  background: var(--background-primary, #1e293b); // Default dark mode color
`;

export const GridContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px 32px 48px 32px; // top, right, bottom, left
  box-sizing: border-box;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 900px) {
    padding: 24px 12px 36px 12px;
  }
  @media (max-width: 600px) {
    padding: 12px 4px 24px 4px;
  }

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.2);
    border-radius: 4px;

    &:hover {
      background: rgba(148, 163, 184, 0.3);
    }
  }
`;

export const PaginationWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    rgba(30, 41, 59, 0) 0%,
    rgba(30, 41, 59, 0.8) 20%,
    rgba(30, 41, 59, 0.95) 50%,
    rgba(30, 41, 59, 1) 100%
  );
  padding: 20px 0;
  margin-top: -60px;
  z-index: 10;
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    padding: 12px 0;
    button {
      min-width: 32px;
      padding: 0.25rem 0.5rem;
      font-size: 0.9rem;
    }
  }
`;

export const flashHighlight = keyframes`
  0% { background-color: rgba(70, 130, 180, 0); }
  50% { background-color: rgba(70, 130, 180, 0.1); }
  100% { background-color: rgba(70, 130, 180, 0); }
`;

export const GridContent = styled.div<{ $maxWidth: string; $isLimitChange: boolean }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  margin: 0;
  animation: ${(props) => (props.$isLimitChange ? flashHighlight : 'none')} 0.5s ease;
`;

export const PlaylistCardWrapper = styled.div`
  width: 200px;
  height: 280px;
  position: relative;
  isolation: isolate;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  background: ${(props) => (props.$active ? 'rgba(148, 163, 184, 0.2)' : 'transparent')};
  color: ${(props) => (props.$active ? '#ffffff' : 'rgba(148, 163, 184, 0.8)')};
  border: 1px solid
    ${(props) => (props.$active ? 'rgba(148, 163, 184, 0.4)' : 'rgba(148, 163, 184, 0.1)')};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  font-family: var(--font-mulish);

  &:hover {
    background: rgba(148, 163, 184, 0.15);
    border-color: rgba(148, 163, 184, 0.3);
    color: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: transparent;
      border-color: rgba(148, 163, 184, 0.1);
      color: rgba(148, 163, 184, 0.8);
    }
  }
`;

export const Ellipsis = styled.span`
  color: rgba(148, 163, 184, 0.8);
  padding: 0 0.5rem;
`;

export const GlobalStyle = createGlobalStyle`
  :root {
    --background-primary: #1e293b;
    --background-secondary: #0f172a;
    --text-primary: #ffffff;
    --text-secondary: rgba(148, 163, 184, 0.8);
    --border-color: rgba(148, 163, 184, 0.1);
    --hover-color: rgba(148, 163, 184, 0.15);
    --active-color: rgba(148, 163, 184, 0.2);
  }

  [data-theme="light"] {
    --background-primary: #f8fafc;
    --background-secondary: #f1f5f9;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: rgba(30, 41, 59, 0.1);
    --hover-color: rgba(30, 41, 59, 0.05);
    --active-color: rgba(30, 41, 59, 0.1);
  }
`;
