import styled from 'styled-components';

export const Card = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  width: 200px;
  height: 280px;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.05);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    background: rgba(30, 41, 59, 0.5);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.15),
      0 20px 40px -12px rgba(0, 0, 0, 0.3),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  flex-shrink: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 1;
  }
`;

export const PlaylistInfo = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

export const PlaylistName = styled.h3`
  color: white;
  font-size: 1rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const TrackCount = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;
