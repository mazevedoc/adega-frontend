export function isEmpty(value) {
    return !value || value.trim() === '';
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function doPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

export function isPasswordSufficient(password) {
    return password.length >= 6;
}

export function isSelected(selectElement) {
    return selectElement && selectElement.value !== '';
}

export function displayFieldError(container, message) {
    if (!container) return;

    let feedback = container.querySelector('.invalid-feedback');

    if (!feedback) {
        feedback = document.createElement('div');
        feedback.classList.add('invalid-feedback');
        container.appendChild(feedback);
    }

    container.classList.add('has-error');
    feedback.textContent = message;

    const input = container.querySelector('input, select');
    if (input) input.classList.add('is-invalid');
}

export function clearFieldError(container) {
    if (!container) return;

    const feedback = container.querySelector('.invalid-feedback');
    const input = container.querySelector('input, select');

    if (feedback) feedback.textContent = '';
    if (input) input.classList.remove('is-invalid');

    container.classList.remove('has-error');
}

export function clearAllFormErrors(form) {
    const errorContainers = form.querySelectorAll('.has-error');
    errorContainers.forEach(container => clearFieldError(container));
}

export function showUserFeedback(message, type = 'info', formElement = document.body, timeout = 3000) {
    if (!formElement) return;

    let feedbackContainer = formElement.querySelector('.user-feedback-message');

    if (!feedbackContainer) {
        feedbackContainer = document.createElement('div');
        feedbackContainer.className = `alert user-feedback-message position-relative mt-3 fade show`;
        formElement.appendChild(feedbackContainer);
    }

    feedbackContainer.classList.remove('alert-success', 'alert-danger', 'alert-info');

    const typeClasses = {
        success: 'alert-success',
        error: 'alert-danger',
        info: 'alert-info'
    };
    feedbackContainer.classList.add(typeClasses[type] || 'alert-info');

    feedbackContainer.textContent = message;
    feedbackContainer.style.opacity = '1';

    if (timeout > 0) {
        setTimeout(() => {
            feedbackContainer.style.opacity = '0';
            setTimeout(() => feedbackContainer.remove(), 300);
        }, timeout);
    }
}
