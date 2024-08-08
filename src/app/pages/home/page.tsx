'use client';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CardProducts from '@/app/components/cardProduct/page';
import { getAllProducts } from '@/services/productService';


export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { status, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );
    const router = useRouter();

    interface Product {
        id: number;
        name: string;
        description: string;
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data.products);
            } catch (err) {
                setError('Erro ao carregar produtos.');
                console.error(err);
            }
        };

        fetchProducts();
    }, []);
    console.log(products);
    if (!isAuthenticated) {
        router.push('/');
    } else {
        return (
            <>
                {products.map((produtos, index) => (
                    <CardProducts key={index} produtos={produtos} />
                ))}
            </>
        );
    }
}
