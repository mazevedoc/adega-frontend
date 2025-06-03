import { handleLogin, handleRegister } from '../controllers/authController.js';
import { showError, showSuccess } from '../utils/modalUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');
  const registerForm = document.querySelector('#register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim().toLowerCase();
      const password = loginForm.password.value.trim();

      try {
        const user = await handleLogin(email, password);
        showSuccess(`Bem-vindo, ${user.nome}`);
        window.location.href = 'Dashboard.html';
      } catch (error) {
        showError(error.message);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nome = registerForm.nome.value.trim();
      const email = registerForm.email.value.trim().toLowerCase();
      const password = registerForm.password.value.trim();
      const confirmPassword = registerForm.confirmPassword.value.trim();

      try {
        const user = await handleRegister(nome, email, password, confirmPassword);
        showSuccess(`Cadastro realizado com sucesso! Bem-vindo, ${user.nome}`);
        window.location.href = 'Dashboard.html';
      } catch (error) {
        showError(error.message);
      }
    });
  }
});
