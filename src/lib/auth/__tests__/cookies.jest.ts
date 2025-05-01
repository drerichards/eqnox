import { setSecureCookie, getSecureCookie } from '../cookies';
import { cookies } from 'next/headers';

jest.mock('next/headers', () => ({
    cookies: jest.fn()
}));

describe('cookies', () => {
    const mockCookieStore = {
        set: jest.fn(),
        get: jest.fn()
    };

    beforeEach(() => {
        (cookies as jest.Mock).mockReturnValue(mockCookieStore);
        jest.clearAllMocks();
    });

    describe('setSecureCookie', () => {
        it('should set a secure cookie with correct options', async () => {
            await setSecureCookie('test-cookie', 'test-value');
            expect(mockCookieStore.set).toHaveBeenCalledWith('test-cookie', 'test-value', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60
            });
        });
    });

    describe('getSecureCookie', () => {
        it('should get a cookie value', async () => {
            mockCookieStore.get.mockReturnValue({ value: 'test-value' });
            const result = await getSecureCookie('test-cookie');
            expect(result).toEqual({ value: 'test-value' });
            expect(mockCookieStore.get).toHaveBeenCalledWith('test-cookie');
        });
    });
}); 