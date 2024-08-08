'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuthenticated } from '@/features/authSlice';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiPlusSquare, FiEdit, FiTrash2 } from 'react-icons/fi';
import styles from '@/assets/styles/header/header.module.sass';
const Header = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const router = useRouter();
  
    const handleLogout = () => {
      dispatch(logout());
      router.push('/login');
    };
  
    const handleNavigation = (path: string) => {
      router.push(path);
    };
  
    return (
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => router.push('/')}>
          PRODUTOS
        </div>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li onClick={() => handleNavigation('/pages/novo')}>
              <FiPlusSquare className={styles.icon} />
              Novo
            </li>
            <li onClick={() => handleNavigation('/pages/editar')}>
              <FiEdit className={styles.icon} />
              Editar
            </li>
            <li onClick={() => handleNavigation('/pages/deletar')}>
              <FiTrash2 className={styles.icon} />
              Deletar
            </li>
          </ul>
          {isAuthenticated && (
            <button onClick={handleLogout} className={styles.logoutButton}>
              <FiLogOut className={styles.logoutIcon} />
            </button>
          )}
        </nav>
      </header>
    );
  };
  
  export default Header;