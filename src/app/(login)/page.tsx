'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, registerAsync } from '@/features/authSlice';
import { AppDispatch, RootState } from '@/store';
import { useRouter } from 'next/navigation';
import styles from '@/assets/styles/login/login.module.sass';

const Login = () => {
    const [taxNumber, setTaxNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const { status, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );
    const router = useRouter();

    // Verifica se o usuário está autenticado e redireciona se necessário
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/pages/home');
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginAsync({ taxNumber, password }))
            .unwrap()
            .then(() => {
                router.push('/pages/home');
            })
            .catch(() => {
                alert('Falha na autenticação');
            })
            .finally(() => {
                setTaxNumber('');
                setPassword('');
            });
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerAsync({ name, taxNumber, mail, phone, password }))
            .unwrap()
            .then(() => {
                router.push('/pages/home');
            })
            .catch(() => {
                alert('Falha no registro');
            })
            .finally(() => {
                setTaxNumber('');
                setPassword('');
                setName('');
                setPhone('');
                setMail('');
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <input type="checkbox" id={styles.chk} aria-hidden="true" />
                <div className={styles.signup}>
                    <form onSubmit={handleRegister}>
                        <label htmlFor={styles.chk} aria-hidden="true">
                            Cadastro
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="User name"
                            value={name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="taxnumber"
                            placeholder="CPF OR CNPJ"
                            required={true}
                            value={taxNumber}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setTaxNumber(e.target.value)}
                        />
                        <input
                            type="mail"
                            name="mail"
                            placeholder="mail"
                            value={mail}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setMail(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="numero celular"
                            value={phone}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPhone(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            name="pswd"
                            placeholder="Password"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>

                <div className={styles.login}>
                    <form onSubmit={handleLogin}>
                        <label htmlFor={styles.chk} aria-hidden="true">
                            LOGIN
                        </label>
                        <input
                            type="text"
                            name="taxnumber"
                            placeholder="CPF OR CNPJ"
                            required={true}
                            value={taxNumber}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setTaxNumber(e.target.value)}
                        />
                        <input
                            type="password"
                            name="pswd"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(e.target.value)}
                        />
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
