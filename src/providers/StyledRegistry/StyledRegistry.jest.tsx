import { render } from '@testing-library/react';
import StyledRegistry from './StyledRegistry';

jest.mock('@/lib/registry', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="mock-styled-registry">{children}</div>
    ),
}));

jest.mock('@/styles/base', () => ({
    GlobalStyle: () => <div data-testid="mock-global-style" />,
}));

describe('StyledRegistry', () => {
    it('renders children correctly', () => {
        const { getByTestId, getByText } = render(
            <StyledRegistry>
                <div>Test Content</div>
            </StyledRegistry>
        );

        expect(getByTestId('mock-styled-registry')).toBeInTheDocument();
        expect(getByTestId('mock-global-style')).toBeInTheDocument();
        expect(getByText('Test Content')).toBeInTheDocument();
    });
}); 