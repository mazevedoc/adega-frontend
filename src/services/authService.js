// src/services/authService.js

// Importe seu apiClient configurado de api.js quando o tiver
// import { apiClient } from './api.js';

/**
 * Simula uma chamada de login à API.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} - Promessa com dados do usuário e token.
 */
export async function loginUser(credentials) {
    console.log("authService: Enviando credenciais de login para API (simulado)", credentials);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (credentials.email === "teste@adega.com" && credentials.password === "123456") {
                resolve({
                    token: "fake-jwt-token-12345",
                    user: { id: 1, name: "Usuário Teste", email: credentials.email, role: "admin" },
                    message: "Login bem-sucedido"
                });
            } else {
                const error = new Error("Credenciais inválidas.");
                // error.response = { data: { message: "Credenciais inválidas." } }; // Simula estrutura de erro da API
                reject(error);
            }
        }, 1000);
    });
}

/**
 * Simula uma chamada de registro de usuário à API.
 * @param {object} userData - { name, email, password, role }
 * @returns {Promise<object>} - Promessa com mensagem de sucesso e dados do usuário.
 */
export async function registerUser(userData) {
    console.log("authService: Enviando dados de registro para API (simulado)", userData);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "Usuário cadastrado com sucesso!",
                user: { id: Date.now(), ...userData } // Simula um novo usuário
            });
        }, 1500);
    });
}

// Você adicionaria outras funções como logoutUser, getCurrentUser, getToken, isAuthenticated aqui
// conforme desenvolve a integração real com o backend.