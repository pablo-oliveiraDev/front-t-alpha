'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { FaSave, FaTrash } from 'react-icons/fa';
import styles from '@/assets/styles/editProduct/editProduct.module.sass';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}

const EditProduct = () => {
    const router = useRouter();
    const searchParams = useParams();
    const id = Number(searchParams.id);
    console.log(id)
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Product>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            stock: 0
        }
    });

    let token =
        typeof window !== 'undefined'
            ? window.localStorage.getItem('token')
            : null;

    useEffect(() => {
        if (!id) return;
        async function fetchProduct() {
            try {
                const response = await fetch(`https://interview.t-alpha.com.br/api/products/get-one-product/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('editProduct :',data.data.product)
                setProduct(data.data.product); // Salva os dados do produto na variável
                reset(data.data.product); // Preenche o formulário com os dados do produto
            } catch (error) {
                setError('Erro ao carregar o produto.');
                console.error(error);
            }
        }

        fetchProduct();
    }, [id, reset]);

    const onSubmit = async (data: Product) => {
        const product = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
        };
        try {
            const response = await fetch(`https://interview.t-alpha.com.br/api/products/update-product/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            router.push('/home');
        } catch (error) {
            setError('Erro ao atualizar o produto.');
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Tem certeza que deseja deletar este produto?')) return;

        try {
            const response = await fetch(`https://interview.t-alpha.com.br/api/products/delete-product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            router.push('/home');
        } catch (error) {
            setError('Erro ao deletar o produto.');
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Editar Produto</h1>
            {error && <p className={styles.error}>{error}</p>}
            {product ? (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <label>
                        Nome:
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Nome do produto"
                                />
                            )}
                        />
                        {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                    </label>
                    <label>
                        Descrição:
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    placeholder="Descrição do produto"
                                />
                            )}
                        />
                        {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}
                    </label>
                    <label>
                        Preço:
                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    placeholder="Preço do produto"
                                    step="0.01"
                                />
                            )}
                        />
                        {errors.price && <span className={styles.errorMessage}>{errors.price.message}</span>}
                    </label>
                    <label>
                        Estoque:
                        <Controller
                            name="stock"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    placeholder="Quantidade em estoque"
                                />
                            )}
                        />
                        {errors.stock && <span className={styles.errorMessage}>{errors.stock.message}</span>}
                    </label>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.saveButton}>
                            <FaSave /> Salvar
                        </button>
                        <button type="button" onClick={handleDelete} className={styles.deleteButton}>
                            <FaTrash /> Deletar
                        </button>
                    </div>
                </form>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default EditProduct;