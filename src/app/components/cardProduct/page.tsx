import React from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa'; 
import styles from '@/assets/styles/cardProduct/cardProduct.module.sass';





const CardProducts= ({ products }:any) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/edit/${products.id}`);
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.name}>{products.name}</h3>
            <p className={styles.description}>{products.description}</p>
            <button className={styles.editButton} onClick={handleEdit}>
                <FaEdit className={styles.icon} /> Editar{' '}
            </button>
        </div>
    );
};

export default CardProducts;
