export function isEmpty(value) {
    return value === null || value === undefined || String(value).trim() === '';
}

export function isValidEmail(email) {
    if (isEmpty(email)) return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
}

export function isMinLength(value, min) {
    return String(value).length >= min;
}

export function doPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

export function isSelected(selectElement) {
    return selectElement && selectElement.value !== '' && selectElement.value !== null && selectElement.selectedIndex > 0; // Considera a primeira opção como placeholder
}

export function isPasswordSufficient(password) {
    if (isEmpty(password)) return false;
    return isMinLength(password, 6);
}