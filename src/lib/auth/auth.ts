import { AuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scopes = [
    'user-read-email',        // Read access to user's email address
    'user-read-private',      // Read access to user's subscription details
    'playlist-read-private',  // Read access to user's private playlists
    'playlist-read-collaborative', // Read access to user's collaborative playlists
    'user-read-playback-state',   // Read access to user's player state
    'user-top-read',         // Read access to user's top artists and tracks
    'user-read-recently-played' // Read access to user's recently played tracks
].join(' ');

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.NEXT_SPOTIFY_CLIENT_SECRET!,
            authorization: {
                params: { scope: scopes }
            }
        }),
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
}; 