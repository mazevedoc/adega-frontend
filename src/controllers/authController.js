// src/controllers/authController.js

// Supondo que você terá authService.js para chamadas reais à API
// import { loginUser, registerUser } from '../services/authService.js';
// Supondo que você terá domUtils.js para feedback ao usuário
// import { showUserFeedback, clearFormFields } from '../utils/domUtils.js';

/**
 * Simula a função showUserFeedback para este exemplo.
 * Substitua pela sua implementação real de ../utils/domUtils.js
 */
function showUserFeedback(message, type = 'info', formElement) {
    console.log(`[${type.toUpperCase()}] Feedback para ${formElement.id}: ${message}`);
    // Cria um div simples para a mensagem acima do formulário
    const existingMessage = formElement.parentElement.querySelector('.user-feedback-message');
    if (existingMessage) existingMessage.remove();

    const messageDiv = document.createElement('div');
    const alertType = type === 'error' ? 'danger' : type; // Bootstrap class
    messageDiv.className = `alert alert-${alertType} user-feedback-message mt-2`;
    messageDiv.textContent = message;
    formElement.insertAdjacentElement('beforebegin', messageDiv); // Insere antes do form

    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease-out';
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

/**
 * Simula a função clearFormFields para este exemplo.
 */
function clearFormFields(formElement) {
    if (formElement && typeof formElement.reset === 'function') {
        formElement.reset();
    }
}


function setupFlipCard() {
    const flipperCard = document.getElementById('flipperCard');
    const showRegisterLink = document.getElementById('showRegisterForm');
    const showLoginLink = document.getElementById('showLoginForm');

    if (!flipperCard || !showRegisterLink || !showLoginLink) {
        console.warn("Elementos para flip do card ('flipperCard', 'showRegisterForm', 'showLoginForm') não encontrados.");
        return;
    }

    showRegisterLink.addEventListener('click', (event) => {
        event.preventDefault();
        flipperCard.classList.add('is-flipped');
    });

    showLoginLink.addEventListener('click', (event) => {
        event.preventDefault();
        flipperCard.classList.remove('is-flipped');
    });
    console.log("authController: Funcionalidade de flip card configurada.");
}

async function handleLoginSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.loginEmail.value.trim();
    const password = form.loginPassword.value;

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Entrando...';

    try {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios.");
        }
        console.log('Login com:', { email, password });
        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da rede
        
        // Exemplo de resposta de sucesso (substitua pela chamada real ao seu authService.js)
        // const response = await loginUser({ email, password });
        // localStorage.setItem('authToken', response.token);
        // localStorage.setItem('userData', JSON.stringify(response.user));
        
        showUserFeedback('Login realizado com sucesso! Redirecionando...', 'success', form);
        setTimeout(() => {
            // Redirecionar para o Dashboard (ajuste o caminho se necessário)
            // Em uma SPA real, você usaria seu roteador: router.navigate('/dashboard');
            window.location.href = 'Dashboard.html'; // Ou o caminho raiz da sua SPA que leva ao dashboard
        }, 1500);

    } catch (error) {
        console.error("Erro no login:", error);
        showUserFeedback(error.message || "Erro ao tentar fazer login.", 'error', form);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
    }
}

async function handleRegisterSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.registerName.value.trim();
    const email = form.registerEmail.value.trim();
    const password = form.registerPassword.value;
    const confirmPassword = form.registerConfirmPassword.value;
    const role = form.registerRole.value;

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cadastrando...';

    try {
        if (!name || !email || !password || !confirmPassword || !role) {
            throw new Error("Todos os campos são obrigatórios para o cadastro.");
        }
        if (password !== confirmPassword) {
            throw new Error("As senhas não coincidem.");
        }
        if (password.length < 6) { // Exemplo de validação de senha
            throw new Error("A senha deve ter pelo menos 6 caracteres.");
        }

        console.log('Cadastro com:', { name, email, password, role });
        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Exemplo de resposta de sucesso (substitua pela chamada real ao seu authService.js)
        // const response = await registerUser({ name, email, password, role });
        
        showUserFeedback('Cadastro realizado com sucesso! Faça o login para continuar.', 'success', form);
        clearFormFields(form);
        document.getElementById('flipperCard')?.classList.remove('is-flipped'); // Volta para tela de login

    } catch (error) {
        console.error("Erro no cadastro:", error);
        showUserFeedback(error.message || "Erro ao tentar realizar o cadastro.", 'error', form);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
    }
}

function setCurrentYear() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Função principal para inicializar todos os componentes da página de autenticação.
 */
export function initAuthPage() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePageListeners);
    } else {
        initializePageListeners();
    }
}

function initializePageListeners() {
    console.log("authController: Configurando listeners da página de autenticação...");
    setCurrentYear(); // Atualiza o ano no footer
    setupFlipCard(); // Configura o efeito de virar o card

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    } else {
        console.warn("Formulário de login ('loginForm') não encontrado no DOM.");
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    } else {
        console.warn("Formulário de cadastro ('registerForm') não encontrado no DOM.");
    }
    console.log("authController: Listeners da página de autenticação configurados e prontos.");
}