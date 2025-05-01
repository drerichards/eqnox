'use client';

import styled from 'styled-components';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Nav = styled.nav`
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

const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  font-family: var(--font-mulish);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #9ca3af;
  text-decoration: none;
  font-family: var(--font-mulish);
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const LogoutButton = styled.button`
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

export default function Navigation() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Nav>
      <Logo href="/">EQnox</Logo>
      <NavLinks>
        {session ? (
          <>
            <NavLink href="/user/library">Library</NavLink>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <NavLink href="/auth/login">Login</NavLink>
        )}
      </NavLinks>
    </Nav>
  );
}
