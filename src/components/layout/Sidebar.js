export function initSidebarToggle() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarWrapper = document.getElementById('sidebar-wrapper');

  if (sidebarToggle && sidebarWrapper) {
    sidebarToggle.addEventListener('click', () => {
      sidebarWrapper.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-overlay-active');
    });

    document.body.addEventListener('click', function(event) {
      if (document.body.classList.contains('sidebar-overlay-active')) {
        if (!sidebarWrapper.contains(event.target) && !sidebarToggle.contains(event.target)) {
          sidebarWrapper.classList.remove('sidebar-open');
          document.body.classList.remove('sidebar-overlay-active');
        }
      }
    });

  } else {
    if (!sidebarToggle) console.error("Elemento 'sidebarToggle' não encontrado.");
    if (!sidebarWrapper) console.error("Elemento 'sidebar-wrapper' não encontrado para toggle.");
  }
}

export function initSidebarNavigation() {
  const links = document.querySelectorAll('#sidebar-wrapper .list-group-item[data-section]');
  const sections = document.querySelectorAll('.dashboard-section');
  const navbarTitle = document.querySelector('#page-content-wrapper .navbar-brand');

  if (!links.length) {
    console.error("Nenhum link de navegação da sidebar com 'data-section' encontrado.");
    return;
  }
  if (!sections.length) {
    console.error("Nenhuma 'dashboard-section' encontrada para exibir.");
    // return; // Pode ser que inicialmente nenhuma seção precise ser mostrada além do conteúdo principal
  }
  if (!navbarTitle) {
    console.error("Elemento '.navbar-brand' não encontrado para atualizar o título.");
  }

  const titleMap = {
    'dashboard': 'Dashboard',
    'produtos': 'Produtos',
    'vendas': 'Vendas',
    'clientes': 'Clientes'
  };

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      const sectionIdToShow = 'section-' + this.dataset.section;

      // Esconde todas as seções de conteúdo específico (produtos, vendas, clientes)
      sections.forEach(section => {
        section.style.display = 'none';
      });

      const targetSection = document.getElementById(sectionIdToShow);
      if (targetSection) {
        targetSection.style.display = 'block';
      } else {
        console.warn(`Seção '${sectionIdToShow}' não encontrada.`);
      }

      if (navbarTitle) {
        navbarTitle.textContent = titleMap[this.dataset.section] || 'Dashboard';
      }
    });
  });

  const defaultActiveLink = document.querySelector('#sidebar-wrapper .list-group-item[data-section="dashboard"]');
  if (defaultActiveLink) {
    defaultActiveLink.click();
  } else {
    if (links.length > 0) links[0].click();
  }
}