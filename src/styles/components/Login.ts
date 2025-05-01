'use client';

import styled from 'styled-components';

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const LoginCard = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 4px 16px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #4682b4, #87ceeb);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #94a3b8;
  margin-bottom: 2rem;
  text-align: center;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 
    0 4px 12px rgba(29, 185, 84, 0.3),
    0 2px 4px rgba(29, 185, 84, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  letter-spacing: 0.5px;
  text-transform: none;

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 8px 24px rgba(29, 185, 84, 0.4),
      0 4px 8px rgba(29, 185, 84, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
    background: linear-gradient(135deg, #1ed760 0%, #1DB954 100%);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 
      0 2px 8px rgba(29, 185, 84, 0.3),
      0 1px 2px rgba(29, 185, 84, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

export const PermissionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  padding: 1.5rem 0;
`;

export const PermissionItem = styled.li`
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '✓';
    color: #1DB954;
    font-weight: bold;
  }
`;

export const Disclaimer = styled.p`
  color: #64748b;
  font-size: 0.75rem;
  text-align: center;
  margin-top: 1.5rem;
`; 