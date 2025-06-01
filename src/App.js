
import { initAuthPage } from './controllers/authController.js';

export function renderLoginPage(containerId = 'root') {
    const appContainer = document.getElementById(containerId);
    if (appContainer) {
        if (document.getElementById('loginForm') || document.getElementById('registerForm')) { // Verifica se estamos na página de login
             initAuthPage();
        }
    }
}