import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import StyledComponentsRegistry from '@/lib/registry';
import { SessionProvider } from '@/components/providers/SessionProvider';
import QueryProvider from '@/components/providers/QueryProvider';

const mulish = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Eqnox',
    description: 'Music streaming platform',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={mulish.className}>
                <QueryProvider>
                    <SessionProvider>
                        <StyledComponentsRegistry>
                            <Navigation />
                            {children}
                        </StyledComponentsRegistry>
                    </SessionProvider>
                </QueryProvider>
            </body>
        </html>
    );
} 