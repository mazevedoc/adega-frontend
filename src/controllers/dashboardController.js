export function handleResponsiveSidebar() {
  const sidebarWrapper = document.getElementById('sidebar-wrapper');
  if (!sidebarWrapper) {
    console.error("#sidebar-wrapper não encontrado para handleResponsiveSidebar");
    return;
  }

  const checkScreenSize = () => {
    if (window.innerWidth >= 992) { 
      sidebarWrapper.classList.add('sidebar-open');
    } else {
     
    }
  };

  window.addEventListener('resize', checkScreenSize);
  checkScreenSize(); // Chama na carga inicial para definir o estado correto
  console.log("Manipulador de sidebar responsiva inicializado.");
}

export function adjustLayoutForLargeScreens() {
  console.log("adjustLayoutForLargeScreens chamado - sem lógica específica implementada por padrão.");
  if (window.innerWidth >= 992) {

  }
}

export function initUserProfileModals() {
  const linkMeuPerfil = document.getElementById('linkMeuPerfil');
  const linkConfiguracoes = document.getElementById('linkConfiguracoes');

  // Guardar instâncias dos modais para evitar recriação
  let modalPerfilInstance = null;
  const modalPerfilElement = document.getElementById('modalMeuPerfil');
  if (modalPerfilElement) {
    modalPerfilInstance = new bootstrap.Modal(modalPerfilElement);
  } else {
    console.error("Elemento do modal 'modalMeuPerfil' não foi encontrado no DOM.");
  }

  let modalConfiguracoesInstance = null;
  const modalConfiguracoesElement = document.getElementById('modalConfiguracoes');
  if (modalConfiguracoesElement) {
    modalConfiguracoesInstance = new bootstrap.Modal(modalConfiguracoesElement);
  } else {
    console.error("Elemento do modal 'modalConfiguracoes' não foi encontrado no DOM.");
  }

  if (linkMeuPerfil && modalPerfilInstance) {
    linkMeuPerfil.addEventListener('click', function (event) {
      event.preventDefault();
      modalPerfilInstance.show();
    });
  } else {
    if (!linkMeuPerfil) console.warn("Link 'linkMeuPerfil' não encontrado.");
    if (!modalPerfilInstance) console.warn("Instância do modal 'Meu Perfil' não pôde ser criada.");
  }

  if (linkConfiguracoes && modalConfiguracoesInstance) {
    linkConfiguracoes.addEventListener('click', function (event) {
      event.preventDefault();
      modalConfiguracoesInstance.show();
    });
  } else {
    if (!linkConfiguracoes) console.warn("Link 'linkConfiguracoes' não encontrado.");
    if (!modalConfiguracoesInstance) console.warn("Instância do modal 'Configurações' não pôde ser criada.");
  }
}