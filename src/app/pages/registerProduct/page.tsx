'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from '@/assets/styles/registerProduct/registerProduct.module.sass';
import { toast } from 'react-toastify';

interface ProductFormInputs {
    name: string;
    description: string;
    price: number;
    stock: number;
}

export default function RegisterProduct() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormInputs>();
    const router = useRouter();

    const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
        const product = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
        };
        const token =
            typeof window !== 'undefined'
                ? localStorage.getItem('token')
                : null;

        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        try {
            const response = await fetch(
                'https://interview.t-alpha.com.br/api/products/create-product',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(product),
                }
            );

            if (!response.ok) {
                console.error(
                    'Erro ao cadastrar produto:',
                    response.status,
                    response.statusText
                );
                return;
            }

            const result = await response.json();
            toast.success('Produto cadastrado com sucesso:');
            console.log('Produto cadastrado com sucesso:', result);

            router.push('/pages/home');
        } catch (error) {
            toast.error('Erro ao cadastrar produto');
            console.error('Erro ao cadastrar produto:', error);
        } finally {
            reset();
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome do Produto</label>
                    <input
                        id="name"
                        {...register('name', {
                            required: 'Nome é obrigatório',
                        })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Descrição</label>
                    <input id="description" {...register('description', {})} />
                    {errors.description && (
                        <span>{errors.description.message}</span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="price">Preço</label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register('price', {
                            required: 'Preço é obrigatório',
                        })}
                    />
                    {errors.price && <span>{errors.price.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="stock">Estoque</label>
                    <input
                        id="stock"
                        type="number"
                        {...register('stock', {
                            required: 'Estoque é obrigatório',
                        })}
                    />
                    {errors.stock && <span>{errors.stock.message}</span>}
                </div>

                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}
