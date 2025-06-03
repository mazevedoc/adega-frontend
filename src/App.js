import { initAuthEvents } from './controllers/authController.js';

export function initApp() {
    initAuthEvents();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}
