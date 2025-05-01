'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import {
    LoginContainer,
    LoginCard,
    Title,
    Subtitle,
    LoginButton,
    ErrorMessage,
    PermissionsList,
    PermissionItem,
    Disclaimer,
} from '@/styles/components/Login';

const SpotifyIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.85-6.82-2.27-11.281-1.24-.418.1-.842-.16-.94-.57-.101-.421.159-.84.579-.94 4.891-1.119 9.13-.58 12.501 1.439.371.241.49.721.241 1.07zm1.47-3.27c-.301.42-.841.6-1.262.3-3.45-2.12-8.7-2.731-12.751-1.49-.481.13-.96-.12-1.11-.6-.14-.48.12-.96.6-1.11 4.651-1.409 10.441-.72 14.401 1.78.42.3.6.84.3 1.26zm.129-3.42c-4.141-2.459-11.001-2.689-14.971-1.489-.601.18-1.231-.181-1.411-.781-.18-.601.18-1.23.78-1.411 4.561-1.38 12.151-1.11 16.951 1.71.539.319.719 1.02.389 1.569-.299.539-1.019.719-1.569.389z" />
    </svg>
);

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await signIn('spotify', {
                callbackUrl: '/user/library',
            });
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginContainer>
            <LoginCard>
                <Title>Welcome to Eqnox</Title>
                <Subtitle>Connect your Spotify account to continue</Subtitle>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <PermissionsList>
                    <PermissionItem>Access your Spotify account email</PermissionItem>
                    <PermissionItem>View your public profile</PermissionItem>
                    <PermissionItem>View your private and collaborative playlists</PermissionItem>
                    <PermissionItem>View your recently played tracks</PermissionItem>
                </PermissionsList>

                <LoginButton
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    <SpotifyIcon />
                    {isLoading ? 'Connecting...' : 'Login with Spotify'}
                </LoginButton>

                <Disclaimer>
                    We use Spotify's secure authentication. Your password is never shared with us.
                </Disclaimer>
            </LoginCard>
        </LoginContainer>
    );
} 