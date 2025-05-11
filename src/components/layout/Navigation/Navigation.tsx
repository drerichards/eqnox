'use client';

import { useSession } from 'next-auth/react';
import { Nav, Logo, NavLinks, NavLink, LogoutButton } from './Navigation.styles';
import { handleLogout } from './Navigation.helpers';

export default function Navigation() {
  const { data: session } = useSession();

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
