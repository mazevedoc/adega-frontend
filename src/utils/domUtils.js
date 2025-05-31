/**
 * Mostra uma mensagem de feedback ao usuário, geralmente acima de um formulário.
 * @param {string} message - A mensagem a ser exibida.
 * @param {'success' | 'error' | 'info'} type - O tipo de mensagem (para estilização).
 * @param {HTMLElement} formElement - O formulário acima do qual a mensagem será inserida.
 * @param {number} timeout - Tempo em ms para a mensagem desaparecer (0 para não desaparecer).
 */
export function showUserFeedback(message, type = 'info', formElement, timeout = 5000) {
    if (!formElement) {
        console.warn("showUserFeedback: Elemento de formulário não fornecido para exibir mensagem.");
        alert(`${type.toUpperCase()}: ${message}`); // Fallback para alert
        return;
    }

    // Remove qualquer mensagem anterior
    const existingMessage = formElement.parentElement.querySelector('.user-feedback-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'error' ? 'danger' : type} user-feedback-message`;
    messageDiv.setAttribute('role', 'alert');
    messageDiv.textContent = message;

    // Insere a mensagem antes do formulário, dentro do mesmo pai
    formElement.parentElement.insertBefore(messageDiv, formElement);

    if (timeout > 0) {
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300); // Espera a transição de opacidade
        }, timeout);
    }
}

export function clearFormFields(formElement) {
    if (formElement && typeof formElement.reset === 'function') {
        formElement.reset();
    }
}

// Adicione outras funções utilitárias de DOM conforme necessário
// Ex: setupRequiredAsterisk, showErrorModal (se você tiver modais genéricos)