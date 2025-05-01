/**
 * @jest-environment node
 */

import StyledComponentsRegistry from '../registry';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Mock styled-components
const mockClearTag = jest.fn();
const mockGetStyleElement = jest.fn().mockReturnValue([]);
const mockInstance = { clearTag: mockClearTag };

jest.mock('styled-components', () => ({
    ServerStyleSheet: jest.fn().mockImplementation(() => ({
        getStyleElement: mockGetStyleElement,
        instance: mockInstance,
    })),
    StyleSheetManager: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock next/navigation
jest.mock('next/navigation', () => {
    let insertCallback: () => React.ReactNode;
    return {
        useServerInsertedHTML: (callback: () => React.ReactNode) => {
            insertCallback = callback;
            return null;
        },
        __getInsertCallback: () => insertCallback,
    };
});

describe('StyledComponentsRegistry', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock window as undefined to simulate server-side rendering
        Object.defineProperty(global, 'window', { value: undefined });
    });

    it('should call useServerInsertedHTML and clear styles', () => {
        // Render the component
        renderToString(
            <StyledComponentsRegistry>
                <div>Test Content</div>
            </StyledComponentsRegistry>
        );

        // Get the callback that was registered with useServerInsertedHTML
        const { __getInsertCallback } = require('next/navigation');
        const insertCallback = __getInsertCallback();

        // Call the callback
        insertCallback();

        // Verify that styles were handled correctly
        expect(mockGetStyleElement).toHaveBeenCalled();
        expect(mockClearTag).toHaveBeenCalled();
    });
}); 