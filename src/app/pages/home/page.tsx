'use client';
import React from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { status, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );
    const router = useRouter();

    if (!isAuthenticated) {
        router.push('/');
    } else {
        return (
            <main>
                <h1>vc esta na home</h1>
            </main>
        );
    }
}
