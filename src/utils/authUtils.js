export function togglePasswordVisibility(icon) {
    const targetId = icon.dataset.targetInput;
    const input = document.getElementById(targetId);

    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = 'visibility';
    } else {
        input.type = 'password';
        icon.textContent = 'visibility_off';
    }
}

export function flipToRegister() {
    const flipper = document.querySelector('.login-card');

    if (flipper) {
        flipper.classList.add('is-flipped');
    } else {
        console.error('Elemento do card principal não encontrado!');
    }
}

export function flipToLogin() {
    const flipper = document.querySelector('.login-card');

    if (flipper) {
        flipper.classList.remove('is-flipped'); 
    } else {
        console.error('Elemento do card principal não encontrado!');
    }
}

export function setupCardFlip() {
  const flipper = document.getElementById('flipperCard');
  const showRegisterBtn = document.getElementById('showRegisterForm');
  const showLoginBtn = document.getElementById('showLoginForm');

  if (flipper && showRegisterBtn && showLoginBtn) {
    showRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      flipper.classList.add('flipped');
    });

    showLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      flipper.classList.remove('flipped');
    });
  }
}
