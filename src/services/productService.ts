import { fetchWithAuth } from '../utils/fetchWithAuth';

export const getAllProducts = async () => {
    const url =
        'https://interview.t-alpha.com.br/api/products/get-all-products';
    return await fetchWithAuth(url, { method: 'GET' });
};
