'use client';

import { useSession } from 'next-auth/react';
import {
    ButtonContainer,
    ContentContainer,
    MainContainer,
    PrimaryButton,
    PrimaryButtonLink,
    Subtitle,
    Title,
} from '@/styles/components/Home';

export default function HomePage() {
    const { data: session, status } = useSession();

    return (
        <MainContainer>
            <ContentContainer>
                <div>
                    <Title>EQnox</Title>
                    <Subtitle>Your Music, Your Way</Subtitle>
                    <ButtonContainer>
                        {status === 'loading' ? (
                            <PrimaryButton disabled>Loading...</PrimaryButton>
                        ) : session ? (
                            <PrimaryButtonLink href="/user/library">
                                Go to Library
                            </PrimaryButtonLink>
                        ) : (
                            <PrimaryButtonLink href="/auth/login">
                                Connect with Spotify
                            </PrimaryButtonLink>
                        )}
                    </ButtonContainer>
                </div>
            </ContentContainer>
        </MainContainer>
    );
} 