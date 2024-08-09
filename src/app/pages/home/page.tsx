'use client';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from '@/assets/styles/home/home.module.sass';
import CardProducts from '@/app/components/cardProduct/page';

interface Product {
    id: number;
    name: string;
    description: string;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [hasMounted, setHasMounted] = React.useState<boolean>(false);
    const { status, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );
    const router = useRouter();
    let token =
        typeof window !== 'undefined'
            ? window.localStorage.getItem('token')
            : null;
    useEffect(() => {
        setHasMounted(true);
        async function fetchProducts() {
            try {
                const response = await fetch(
                    'https://interview.t-alpha.com.br/api/products/get-all-products',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    console.error(
                        'Erro na requisição:',
                        response.status,
                        response.statusText
                    );
                    return null;
                }

                const data = await response.json();
                setProducts(data.data.products);
                return data;
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                return null;
            }
        }
        fetchProducts();
    }, [token]);

    if (!isAuthenticated) {
        router.push('/');
    }
    return (
        <div className={styles.container}>
            {products.length === 0 ? (
                <>
                    <h1>Vc ainda nao tem produtos cadastrados</h1>
                </>
            ) : (
                products.map((product, index) => (
                    <CardProducts key={index} products={product} />
                ))
            )}
        </div>
    );
}
