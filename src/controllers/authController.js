import { validateLoginForm, validateRegisterForm } from '../utils/validators.js';
import { togglePasswordVisibility, flipToRegister, flipToLogin } from '../utils/authUtils.js';
import { loginUser, registerUser } from '../services/authService.js';

export function initAuthEvents() {
    // Login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const email = formData.get('loginEmail').trim().toLowerCase();
        const password = formData.get('loginPassword');

        if (!validateLoginForm(email, password)) return;

        const response = await loginUser({ email, password });
        if (response.success) {
            alert(`Bem-vindo(a), ${response.user.name}`);
        } else {
            alert(response.message || 'Erro ao fazer login.');
        }
    });

    // Registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);

        const user = {
            name: formData.get('registerName').trim(),
            email: formData.get('registerEmail').trim().toLowerCase(),
            password: formData.get('registerPassword'),
            confirmPassword: formData.get('registerConfirmPassword'),
            role: formData.get('registerRole'),
        };

        if (!validateRegisterForm(user)) return;

        const response = await registerUser(user);
        if (response.success) {
            alert('Cadastro realizado com sucesso!');
            flipToLogin();
        } else {
            alert(response.message || 'Erro ao cadastrar.');
        }
    });

    // Alternar entre login e cadastro
    document.getElementById('showRegisterForm').addEventListener('click', flipToRegister);
    document.getElementById('showLoginForm').addEventListener('click', flipToLogin);


    // Mostrar/ocultar senhas
    document.querySelectorAll('.password-toggle-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            togglePasswordVisibility(icon);
        });
    });
}