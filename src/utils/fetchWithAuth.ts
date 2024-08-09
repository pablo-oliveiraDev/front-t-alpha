export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = window.localStorage.getItem('token'); 
    console.log(token);
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
