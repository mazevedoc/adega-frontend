// API Service  
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'; // Exemplo com Vite .env

async function request(endpoint, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = localStorage.getItem('authToken'); // Ou pegue do seu store/context
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method: options.method || 'GET',
        headers,
        ...options,
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        const data = await response.json(); // Tenta parsear JSON sempre

        if (!response.ok) {
            // Cria um objeto de erro que inclui a resposta da API e o status
            const error = new Error(data.message || `HTTP error! status: ${response.status}`);
            error.response = { data, status: response.status, statusText: response.statusText };
            throw error;
        }
        return { data, status: response.status }; // Retorna um objeto com dados e status
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        // Se o erro já tem uma estrutura de resposta (lançado pelo !response.ok)
        if (error.response) {
            throw error;
        }
        // Para erros de rede ou parseamento de JSON não relacionado a uma resposta HTTP
        const networkError = new Error(error.message || 'Erro de rede ou resposta inválida.');
        networkError.isNetworkError = true;
        throw networkError;
    }
}

// Wrapper para métodos HTTP comuns
export const apiClient = {
    get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
    post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
    put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
    delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
    // Adicione patch, etc., conforme necessário
};