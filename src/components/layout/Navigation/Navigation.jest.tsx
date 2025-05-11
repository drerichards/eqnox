import { render, screen, fireEvent } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Navigation from './Navigation';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signOut: jest.fn(),
}));

describe('when Navigation is rendered', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render logo correctly', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
        render(<Navigation />);
        expect(screen.getByText('EQnox')).toBeInTheDocument();
    });

    it('should show login link when user is not authenticated', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
        render(<Navigation />);
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.queryByText('Library')).not.toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });

    it('should show library and logout links when user is authenticated', () => {
        (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test User' } } });
        render(<Navigation />);
        expect(screen.getByText('Library')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    it('should call signOut when logout button is clicked', () => {
        (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test User' } } });
        render(<Navigation />);

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
    });

    it('should have correct styling for navigation', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
        render(<Navigation />);

        const nav = screen.getByRole('navigation');
        const computedStyle = window.getComputedStyle(nav);

        expect(computedStyle.position).toBe('fixed');
        expect(computedStyle.top).toBe('0px');
        expect(computedStyle.left).toBe('0px');
        expect(computedStyle.right).toBe('0px');
        expect(computedStyle.height).toBe('64px');
        expect(computedStyle.backgroundColor).toBe('rgb(26, 28, 33)');
    });
}); 