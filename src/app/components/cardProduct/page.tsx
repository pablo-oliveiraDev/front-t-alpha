import React from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa'; 
import styles from '@/assets/styles/cardProduct/cardProduct.module.sass';





const CardProducts= ({ products }:any) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/pages/${products.id}/editProduct`);
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.name}>{products.name}</h3>
            <p className={styles.description}><span>Descrição :</span>{products.description}</p>
            <p className={styles.description}><span>Preço :</span>{products.price}</p>
            <p className={styles.description}><span>Estoque :</span>{products.stock}</p>
            <button className={styles.editButton} onClick={handleEdit}>
                <FaEdit className={styles.icon} /> Editar{' '}
            </button>
        </div>
    );
};

export default CardProducts;
