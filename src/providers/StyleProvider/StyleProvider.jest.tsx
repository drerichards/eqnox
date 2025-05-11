import { render } from '@testing-library/react';
import StyleProvider from './StyleProvider';

jest.mock('@/lib/registry', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="mock-styled-registry">{children}</div>
    ),
}));

jest.mock('styled-components', () => ({
    createGlobalStyle: () => () => <div data-testid="mock-global-style" />,
}));

describe('StyleProvider', () => {
    it('renders children correctly', () => {
        const { getByTestId, getByText } = render(
            <StyleProvider>
                <div>Test Content</div>
            </StyleProvider>
        );

        expect(getByTestId('mock-styled-registry')).toBeInTheDocument();
        expect(getByTestId('mock-global-style')).toBeInTheDocument();
        expect(getByText('Test Content')).toBeInTheDocument();
    });
}); 