import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

describe('Auth Types', () => {
    describe('Session', () => {
        it('should have correct type structure', () => {
            const session: Session = {
                user: {
                    id: '123',
                    name: 'Test User',
                    email: 'test@example.com',
                    image: 'https://example.com/image.jpg'
                },
                expires: new Date().toISOString()
            };

            expect(session).toHaveProperty('user');
            expect(session.user).toHaveProperty('id');
            expect(session.user).toHaveProperty('name');
            expect(session.user).toHaveProperty('email');
            expect(session.user).toHaveProperty('image');
            expect(session).toHaveProperty('expires');
        });

        it('should support error and accessToken properties', () => {
            const session: Session = {
                user: {
                    id: '123',
                    name: 'Test User',
                    email: 'test@example.com',
                    image: 'https://example.com/image.jpg'
                },
                expires: new Date().toISOString(),
                error: 'RefreshAccessTokenError',
                accessToken: 'mock-access-token'
            };

            expect(session.error).toBe('RefreshAccessTokenError');
            expect(session.accessToken).toBe('mock-access-token');
        });

        it('should allow optional user properties', () => {
            const session: Session = {
                user: {
                    id: undefined,
                    name: null,
                    email: null,
                    image: null
                },
                expires: new Date().toISOString()
            };

            expect(session.user.id).toBeUndefined();
            expect(session.user.name).toBeNull();
            expect(session.user.email).toBeNull();
            expect(session.user.image).toBeNull();
        });
    });

    describe('JWT', () => {
        it('should have correct type structure', () => {
            const jwt: JWT = {
                sub: '123',
                name: 'Test User',
                email: 'test@example.com',
                picture: 'https://example.com/image.jpg',
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
                expiresAt: Date.now() + 3600000
            };

            expect(jwt).toHaveProperty('sub');
            expect(jwt).toHaveProperty('name');
            expect(jwt).toHaveProperty('email');
            expect(jwt).toHaveProperty('picture');
            expect(jwt).toHaveProperty('accessToken');
            expect(jwt).toHaveProperty('refreshToken');
            expect(jwt).toHaveProperty('expiresAt');
        });

        it('should support error property', () => {
            const jwt: JWT = {
                sub: '123',
                name: 'Test User',
                email: 'test@example.com',
                picture: 'https://example.com/image.jpg',
                error: 'RefreshAccessTokenError'
            };

            expect(jwt.error).toBe('RefreshAccessTokenError');
        });

        it('should allow optional properties', () => {
            const jwt: JWT = {
                sub: '123',
                name: 'Test User'
            };

            expect(jwt.accessToken).toBeUndefined();
            expect(jwt.refreshToken).toBeUndefined();
            expect(jwt.expiresAt).toBeUndefined();
            expect(jwt.error).toBeUndefined();
        });
    });
}); 