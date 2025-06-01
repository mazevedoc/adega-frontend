import { showUserFeedback } from '../utils/domUtils';

function setupFlipCard() {
    const flipperCard = document.getElementById('flipperCard');
    const showRegisterLink = document.getElementById('showRegisterForm');
    const showLoginLink = document.getElementById('showLoginForm');

    const frontFace = flipperCard?.querySelector('.login-card-front');
    const backFace = flipperCard?.querySelector('.login-card-back');

    if (!flipperCard || !showRegisterLink || !showLoginLink || !frontFace || !backFace) {
        console.warn("Elementos para flip do card não encontrados completamente.");
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

    console.log("authController: Flip card configurado com sucesso.");
}

async function handleLoginSubmit(event) {
    event.preventDefault();
    const form = event.target;
    clearAllFormErrors(form);

    const emailElement = form.loginEmail;
    const passwordElement = form.loginPassword;
    const email = emailElement.value.trim();
    const password = passwordElement.value;
    let isValid = true;

    if (isEmpty(email)) {
        displayFieldError(emailElement.closest('.form-floating'), "O campo Email ou Usuário é obrigatório.");
        isValid = false;
    } else if (!isValidEmail(email)) {
        displayFieldError(emailElement.closest('.form-floating'), "Email inválido.");
    } else {
        clearFieldError(emailElement.closest('.form-floating'));
    }

    if (isEmpty(password)) {
        displayFieldError(passwordElement.closest('.form-floating'), "O campo Senha é obrigatório.");
        isValid = false;
    } else {
        clearFieldError(passwordElement.closest('.form-floating'));
    }

    if (!isValid) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Entrando...';

    try {
        console.log('Login com:', { email, password });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula chamada à API

        showUserFeedback('Login realizado com sucesso! Redirecionando...', 'success', form);
        setTimeout(() => { window.location.href = 'Dashboard.html'; }, 1500);
    } catch (error) {
        console.error("Erro no login:", error);
        showUserFeedback(error.message || "Credenciais inválidas ou erro no servidor.", 'error', form);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
    }
}

async function handleRegisterSubmit(event) {
    event.preventDefault();
    const form = event.target;
    clearAllFormErrors(form);

    const nameElement = form.registerName;
    const emailElement = form.registerEmail;
    const passwordElement = form.registerPassword;
    const confirmPasswordElement = form.registerConfirmPassword;
    const roleElement = form.registerRole;

    const name = nameElement.value.trim().replace(/\s+/g, ' ');
    const email = emailElement.value.trim().toLowerCase();
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;
    const role = roleElement.value;

    let isValid = true;

    if (isEmpty(name)) {
        displayFieldError(nameElement.closest('.form-floating'), "Nome completo é obrigatório.");
        isValid = false;
    } else clearFieldError(nameElement.closest('.form-floating'));

    if (isEmpty(email)) {
        displayFieldError(emailElement.closest('.form-floating'), "Email é obrigatório.");
        isValid = false;
    } else if (!isValidEmail(email)) {
        displayFieldError(emailElement.closest('.form-floating'), "Formato de email inválido.");
        isValid = false;
    } else clearFieldError(emailElement.closest('.form-floating'));

    if (isEmpty(password)) {
        displayFieldError(passwordElement.closest('.form-floating'), "Senha é obrigatória.");
        isValid = false;
    } else if (!isPasswordSufficient(password)) {
        displayFieldError(passwordElement.closest('.form-floating'), "A senha deve ter pelo menos 6 caracteres.");
        isValid = false;
    } else clearFieldError(passwordElement.closest('.form-floating'));

    if (isEmpty(confirmPassword)) {
        displayFieldError(confirmPasswordElement.closest('.form-floating'), "Confirmação de senha é obrigatória.");
        isValid = false;
    } else if (password && !doPasswordsMatch(password, confirmPassword)) {
        displayFieldError(confirmPasswordElement.closest('.form-floating'), "As senhas não coincidem.");
        isValid = false;
    } else clearFieldError(confirmPasswordElement.closest('.form-floating'));

    if (!isSelected(roleElement)) {
        displayFieldError(roleElement.closest('.form-floating'), "Por favor, selecione um papel (cargo).");
        isValid = false;
    } else clearFieldError(roleElement.closest('.form-floating'));

    if (!isValid) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cadastrando...';

    try {
        console.log('Cadastro com:', { name, email, password, role });
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula chamada à API

        showUserFeedback('Cadastro realizado com sucesso! Faça o login para continuar.', 'success', form);
        document.getElementById('flipperCard')?.classList.remove('is-flipped');
    } catch (error) {
        console.error("Erro no cadastro:", error);
        showUserFeedback(error.message || "Não foi possível realizar o cadastro.", 'error', form);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
    }
}

function setupPasswordVisibilityToggle() {
    const toggleIcons = document.querySelectorAll('.password-toggle-icon');

    toggleIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const targetInputId = this.dataset.targetInput;
            const targetInput = document.getElementById(targetInputId);

            if (targetInput) {
                if (targetInput.type === 'password') {
                    targetInput.type = 'text';
                    this.textContent = 'visibility';
                    this.setAttribute('title', 'Ocultar senha');
                } else {
                    targetInput.type = 'password';
                    this.textContent = 'visibility_off';
                    this.setAttribute('title', 'Mostrar senha');
                }
            } else {
                console.warn(`Input alvo para toggle de senha #${targetInputId} não encontrado.`);
            }
        });
    });

    if (toggleIcons.length > 0) {
        console.log("authController: Toggles de visibilidade de senha configurados.");
    }
}

function setCurrentYear() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

function initializePageListeners() {
    console.log("authController: Iniciando configuração da página de autenticação...");
    setCurrentYear();
    setupFlipCard();
    setupPasswordVisibilityToggle();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    } else {
        console.warn("Formulário de login não encontrado.");
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    } else {
        console.warn("Formulário de cadastro não encontrado.");
    }

    console.log("authController: Listeners configurados com sucesso.");
}

export function initAuthPage() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePageListeners);
    } else {
        initializePageListeners();
    }
}