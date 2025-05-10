import { Account, Profile, Session } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

// Mock SpotifyProvider
jest.mock('next-auth/providers/spotify', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        id: 'spotify',
        name: 'Spotify',
        type: 'oauth',
        options: {
            clientId: '1234567890123456789012345678901a',
            clientSecret: '1234567890123456789012345678901b'
        }
    }))
}));

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('when auth config is used', () => {
    const mockToken: JWT = {
        name: 'Test User',
        sub: 'user-123',
        accessToken: 'old-access-token',
        refreshToken: 'refresh-token',
        expiresAt: Date.now() + 3600000, // 1 hour from now
    };

    const mockUser: AdapterUser = {
        id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        emailVerified: new Date(),
        image: null
    };

    beforeEach(() => {
        jest.clearAllMocks();
        process.env = {
            NODE_ENV: 'test',
            NEXT_SPOTIFY_CLIENT_ID: '1234567890123456789012345678901a',
            NEXT_SPOTIFY_CLIENT_SECRET: '1234567890123456789012345678901b',
            NEXTAUTH_URL: 'http://localhost:3000',
            NEXTAUTH_SECRET: 'mock-secret-12345678901234567890123456789012'
        };
        // Force module re-evaluation
        jest.resetModules();
        // Mock console methods
        console.error = jest.fn();
        console.log = jest.fn();
    });

    it('should configure Spotify provider with correct options', () => {
        const { authOptions } = require('../config');
        const provider = authOptions.providers[0] as ReturnType<typeof SpotifyProvider>;
        expect(provider.id).toBe('spotify');
        expect(provider.name).toBe('Spotify');
        expect(provider.options).toHaveProperty('clientId', '1234567890123456789012345678901a');
        expect(provider.options).toHaveProperty('clientSecret', '1234567890123456789012345678901b');
    });

    describe('when jwt callback is used', () => {
        beforeEach(() => {
            global.fetch = jest.fn();
        });

        it('should return token with access token on initial sign in', async () => {
            const { authOptions } = require('../config');
            const account: Account = {
                access_token: 'new-access-token',
                refresh_token: 'new-refresh-token',
                expires_at: Math.floor(Date.now() / 1000) + 3600,
                provider: 'spotify',
                providerAccountId: 'user-123',
                type: 'oauth'
            };

            const result = await authOptions.callbacks!.jwt!({
                token: mockToken,
                account,
                user: mockUser,
                profile: {} as Profile,
                trigger: 'signIn'
            });

            expect(result).toEqual({
                ...mockToken,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                expiresAt: account.expires_at! * 1000
            });
        });

        it('should return existing token if not expired', async () => {
            const { authOptions } = require('../config');
            const result = await authOptions.callbacks!.jwt!({
                token: mockToken,
                account: null,
                user: mockUser,
                profile: undefined,
                trigger: undefined
            });

            expect(result).toEqual(mockToken);
        });

        it('should refresh token if expired', async () => {
            const { authOptions } = require('../config');
            const expiredToken = {
                ...mockToken,
                expiresAt: Date.now() - 1000, // Expired
            };

            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({
                    access_token: 'new-access-token',
                    expires_in: 3600
                })
            };

            global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

            const result = await authOptions.callbacks!.jwt!({
                token: expiredToken,
                account: null,
                user: mockUser,
                profile: undefined,
                trigger: undefined
            });

            expect(result).toEqual({
                ...expiredToken,
                accessToken: 'new-access-token',
                expiresAt: expect.any(Number)
            });
        });

        it('should handle refresh token error', async () => {
            const { authOptions } = require('../config');
            const expiredToken = {
                ...mockToken,
                expiresAt: Date.now() - 1000, // Expired
            };

            global.fetch = jest.fn().mockRejectedValueOnce(new Error('Refresh failed'));

            const result = await authOptions.callbacks!.jwt!({
                token: expiredToken,
                account: null,
                user: mockUser,
                profile: undefined,
                trigger: undefined
            });

            expect(result).toEqual({
                ...expiredToken,
                error: 'RefreshAccessTokenError'
            });
            expect(console.error).toHaveBeenCalledWith('Error refreshing access token', expect.any(Error));
        });

        it('should handle non-ok response when refreshing token', async () => {
            const { authOptions } = require('../config');
            const expiredToken = {
                ...mockToken,
                expiresAt: Date.now() - 1000, // Expired
            };

            const mockResponse = {
                ok: false,
                json: () => Promise.resolve({ error: 'invalid_grant' })
            };

            global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

            const result = await authOptions.callbacks!.jwt!({
                token: expiredToken,
                account: null,
                user: mockUser,
                profile: undefined,
                trigger: undefined
            });

            expect(result).toEqual({
                ...expiredToken,
                error: 'RefreshAccessTokenError'
            });
            expect(console.error).toHaveBeenCalledWith('Error refreshing access token', { error: 'invalid_grant' });
        });

        it('should handle token refresh error', async () => {
            const { authOptions } = require('../config');
            const token = {
                sub: 'user123',
                accessToken: 'expired-token',
                refreshToken: 'refresh-token',
                expiresAt: Date.now() - 1000
            };

            (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

            const result = await authOptions.callbacks!.jwt!({
                token,
                user: mockUser,
                account: null,
                profile: undefined,
                trigger: 'update'
            });

            expect(result).toEqual({
                ...token,
                error: 'RefreshAccessTokenError'
            });
            expect(console.error).toHaveBeenCalledWith('Error refreshing access token', expect.any(Error));
        });

        it('should handle token refresh response error', async () => {
            const { authOptions } = require('../config');
            const token = {
                sub: 'user123',
                accessToken: 'expired-token',
                refreshToken: 'refresh-token',
                expiresAt: Date.now() - 1000
            };

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                json: () => Promise.resolve({ error: 'invalid_grant' })
            });

            const result = await authOptions.callbacks!.jwt!({
                token,
                user: mockUser,
                account: null,
                profile: undefined,
                trigger: 'update'
            });

            expect(result).toEqual({
                ...token,
                error: 'RefreshAccessTokenError'
            });
            expect(console.error).toHaveBeenCalledWith('Error refreshing access token', { error: 'invalid_grant' });
        });
    });

    describe('when session callback is used', () => {
        it('should add token data to session when token is available', async () => {
            const { authOptions } = require('../config');
            const session = {
                user: { name: 'Test User', email: 'test@example.com' },
                expires: new Date(Date.now() + 3600000).toISOString()
            } as Session;
            const token = {
                sub: 'user123',
                accessToken: 'mock-access-token',
                error: undefined
            };

            const result = await authOptions.callbacks!.session!({
                session,
                token,
                user: mockUser,
                newSession: undefined,
                trigger: 'update'
            });

            expect(result).toEqual({
                ...session,
                error: undefined,
                accessToken: token.accessToken,
                user: {
                    ...session.user,
                    id: token.sub
                }
            });
            expect(console.log).toHaveBeenCalledWith('Session callback - token available:', {
                hasAccessToken: true,
                hasError: false,
                tokenExpiry: 'none'
            });
        });

        it('should return session as is when no token is provided', async () => {
            const { authOptions } = require('../config');
            const session = {
                user: { name: 'Test User', email: 'test@example.com' },
                expires: new Date(Date.now() + 3600000).toISOString()
            } as Session;

            const result = await authOptions.callbacks!.session!({
                session,
                token: null,
                user: mockUser,
                newSession: undefined,
                trigger: 'update'
            });

            expect(result).toEqual(session);
            expect(console.log).toHaveBeenCalledWith('Session callback - no token available');
        });

        it('should handle session data correctly', async () => {
            const { authOptions } = require('../config');
            const session = {
                user: { name: 'Test User', email: 'test@example.com' },
                expires: new Date(Date.now() + 3600000).toISOString()
            } as Session;
            const token = {
                sub: 'user123',
                accessToken: 'mock-access-token',
                error: undefined
            };

            const result = await authOptions.callbacks!.session!({
                session,
                token,
                user: mockUser,
                newSession: undefined,
                trigger: 'update'
            });

            expect(result).toBeDefined();
            expect(result.user).toHaveProperty('id', token.sub);
            expect(result).toHaveProperty('accessToken', token.accessToken);
        });
    });

    it('should have correct session configuration', () => {
        const { authOptions } = require('../config');
        expect(authOptions.session).toEqual({
            strategy: 'jwt',
            maxAge: 3600
        });
    });

    it('should have correct cookie configuration', () => {
        const { authOptions } = require('../config');
        const expectedCookieOptions = {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: false
        };

        expect(authOptions.cookies).toEqual({
            sessionToken: {
                name: 'next-auth.session-token',
                options: expectedCookieOptions
            },
            callbackUrl: {
                name: 'next-auth.callback-url',
                options: expectedCookieOptions
            },
            csrfToken: {
                name: 'next-auth.csrf-token',
                options: expectedCookieOptions
            }
        });
    });
}); 