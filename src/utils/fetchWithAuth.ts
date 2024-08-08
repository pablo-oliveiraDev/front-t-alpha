export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token'); // Obter o token do localStorage

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`, // Adicionar o token ao cabeçalho
        'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
    }

    return response.json();
};
