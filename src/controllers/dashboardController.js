export function handleResponsiveSidebar() {
  const sidebarWrapper = document.getElementById('sidebar-wrapper');
  if (!sidebarWrapper) {
    console.error("#sidebar-wrapper não encontrado para handleResponsiveSidebar");
    return;
  }

  const checkScreenSize = () => {
    if (window.innerWidth >= 992) { // Breakpoint 'lg' do Bootstrap
      // Em telas grandes, a sidebar deve estar visível e integrada ao layout.
      // A classe 'sidebar-open' pode ser necessária se o CSS depender dela
      // para o estado "aberto" mesmo em telas grandes, ou para reverter um toggle.
      sidebarWrapper.classList.add('sidebar-open');
    } else {
      // Em telas menores, a sidebar começa escondida (pelo CSS: margin-left: -250px).
      // O botão de toggle irá adicionar/remover 'sidebar-open' para mostrá-la/escondê-la.
      // Não removemos 'sidebar-open' aqui para não interferir com um toggle manual do usuário.
    }
  };

  window.addEventListener('resize', checkScreenSize);
  checkScreenSize(); // Chama na carga inicial para definir o estado correto
  console.log("Manipulador de sidebar responsiva inicializado.");
}

export function adjustLayoutForLargeScreens() {
  // Esta função pode ser usada para ajustes mais específicos em telas grandes,
  // se necessário. Por enquanto, pode ficar vazia ou conter lógica adicional.
  console.log("adjustLayoutForLargeScreens chamado - sem lógica específica implementada por padrão.");
  if (window.innerWidth >= 992) {
    // Exemplo: console.log("Tela grande detectada, aplicando ajustes de layout.");
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
      event.preventDefault(); // Previne a navegação do link '#'
      modalPerfilInstance.show();
      console.log("Modal 'Meu Perfil' aberto.");
    });
  } else {
    if (!linkMeuPerfil) console.warn("Link 'linkMeuPerfil' não encontrado.");
    if (!modalPerfilInstance) console.warn("Instância do modal 'Meu Perfil' não pôde ser criada.");
  }

  if (linkConfiguracoes && modalConfiguracoesInstance) {
    linkConfiguracoes.addEventListener('click', function (event) {
      event.preventDefault(); // Previne a navegação do link '#'
      modalConfiguracoesInstance.show();
      console.log("Modal 'Configurações' aberto.");
    });
  } else {
    if (!linkConfiguracoes) console.warn("Link 'linkConfiguracoes' não encontrado.");
    if (!modalConfiguracoesInstance) console.warn("Instância do modal 'Configurações' não pôde ser criada.");
  }
}