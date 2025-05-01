import { render, screen } from '@testing-library/react';
import { SessionProvider } from '../SessionProvider';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
    SessionProvider: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="session-provider">{children}</div>
    ),
}));

describe('when SessionProvider is rendered', () => {
    it('should render children correctly', () => {
        const testText = 'Test Child';
        render(
            <SessionProvider>
                <div>{testText}</div>
            </SessionProvider>
        );

        expect(screen.getByText(testText)).toBeInTheDocument();
    });

    it('should wrap children with NextAuth SessionProvider', () => {
        const testText = 'Test Child';
        render(
            <SessionProvider>
                <div>{testText}</div>
            </SessionProvider>
        );

        // The NextAuth SessionProvider should be present in the DOM
        const sessionProvider = screen.getByTestId('session-provider');
        expect(sessionProvider).toBeInTheDocument();
        expect(sessionProvider).toContainElement(screen.getByText(testText));
    });
}); 