import { validateAuthEnv } from '../env';

describe('validateAuthEnv', () => {
    beforeEach(() => {
        process.env = {
            NODE_ENV: 'test',
            NEXT_SPOTIFY_CLIENT_ID: '1234567890123456789012345678901a',
            NEXT_SPOTIFY_CLIENT_SECRET: '1234567890123456789012345678901b',
            NEXTAUTH_URL: 'http://localhost:3000',
            NEXTAUTH_SECRET: 'mock-secret-12345678901234567890123456789012'
        };
    });

    it('should not throw error when all environment variables are valid', () => {
        expect(() => validateAuthEnv()).not.toThrow();
    });

    it('should throw error when NEXT_SPOTIFY_CLIENT_ID is missing', () => {
        delete process.env.NEXT_SPOTIFY_CLIENT_ID;
        expect(() => validateAuthEnv()).toThrow('Missing required environment variable: NEXT_SPOTIFY_CLIENT_ID');
    });

    it('should throw error when NEXT_SPOTIFY_CLIENT_ID is invalid', () => {
        process.env.NEXT_SPOTIFY_CLIENT_ID = 'invalid';
        expect(() => validateAuthEnv()).toThrow('NEXT_SPOTIFY_CLIENT_ID should be a 32-character hex string');
    });

    it('should throw error when NEXT_SPOTIFY_CLIENT_SECRET is missing', () => {
        delete process.env.NEXT_SPOTIFY_CLIENT_SECRET;
        expect(() => validateAuthEnv()).toThrow('Missing required environment variable: NEXT_SPOTIFY_CLIENT_SECRET');
    });

    it('should throw error when NEXT_SPOTIFY_CLIENT_SECRET is invalid', () => {
        process.env.NEXT_SPOTIFY_CLIENT_SECRET = 'invalid';
        expect(() => validateAuthEnv()).toThrow('NEXT_SPOTIFY_CLIENT_SECRET should be a 32-character hex string');
    });

    it('should throw error when NEXTAUTH_URL is missing', () => {
        delete process.env.NEXTAUTH_URL;
        expect(() => validateAuthEnv()).toThrow('Missing required environment variable: NEXTAUTH_URL');
    });

    it('should throw error when NEXTAUTH_URL is invalid', () => {
        process.env.NEXTAUTH_URL = 'invalid-url';
        expect(() => validateAuthEnv()).toThrow('NEXTAUTH_URL must be a valid URL');
    });

    it('should throw error when NEXTAUTH_SECRET is missing', () => {
        delete process.env.NEXTAUTH_SECRET;
        expect(() => validateAuthEnv()).toThrow('Missing required environment variable: NEXTAUTH_SECRET');
    });

    it('should throw error when NEXTAUTH_SECRET is too short', () => {
        process.env.NEXTAUTH_SECRET = 'too-short';
        expect(() => validateAuthEnv()).toThrow();
    });
}); 