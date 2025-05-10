import styled from 'styled-components';
import Link from 'next/link';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #1a1c21;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 50;
`;

export const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  font-family: var(--font-mulish);
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: #9ca3af;
  text-decoration: none;
  font-family: var(--font-mulish);
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-family: var(--font-mulish);
  transition: color 0.2s;
  padding: 0;

  &:hover {
    color: white;
  }
`;
