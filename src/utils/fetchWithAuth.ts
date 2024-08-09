export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    let token =
        typeof window !== 'undefined'
            ? window.localStorage.getItem('token')
            : null;
    
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`, 
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
