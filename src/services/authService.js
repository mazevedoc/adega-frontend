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
                reject(error);
            }
        }, 1000);
    });
}

export async function registerUser(userData) {
    console.log("authService: Enviando dados de registro para API (simulado)", userData);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "Usuário cadastrado com sucesso!",
                user: { id: Date.now(), ...userData }
            });
        }, 1500);
    });
}
