import { withAuth } from 'next-auth/middleware';
import middleware, { config } from './middleware';

// Mock next-auth/middleware
jest.mock('next-auth/middleware', () => ({
    withAuth: jest.fn((config) => {
        const middleware = () => { };
        (middleware as any).config = config;
        return middleware;
    })
}));

describe('middleware', () => {
    it('should have correct matcher configuration', () => {
        expect(config.matcher).toEqual(['/user/:path*']);
    });

    it('should configure withAuth with correct options', () => {
        expect(withAuth).toHaveBeenCalledWith({
            pages: {
                signIn: '/auth/login',
            },
        });
    });

    it('should export the middleware function', () => {
        expect(middleware).toBeDefined();
        expect(typeof middleware).toBe('function');
        expect((middleware as any).config).toEqual({
            pages: {
                signIn: '/auth/login',
            },
        });
    });
}); 