const fakeUsers = [];

export async function loginUser({ email, password }) {
    const user = fakeUsers.find(u => u.email === email && u.password === password);
    if (user) {
        return { success: true, user };
    } else {
        return { success: false, message: 'Credenciais inválidas.' };
    }
}

export async function registerUser({ name, email, password, role }) {
    const exists = fakeUsers.some(u => u.email === email);
    if (exists) {
        return { success: false, message: 'Email já cadastrado.' };
    }

    const newUser = { name, email, password, role };
    fakeUsers.push(newUser);
    return { success: true };
}
