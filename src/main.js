// Entry point  
// main.js
import { initSidebarToggle, initSidebarNavigation } from './components/layout/Sidebar.js';
import { handleResponsiveSidebar, adjustLayoutForLargeScreens, initUserProfileModals } from './controllers/dashboardController.js';
import { initSalesChart } from './components/charts/SalesChart.js';

document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();           // botão hamburguer
  initSidebarNavigation();       // troca de seções
  handleResponsiveSidebar();     // comportamento em resize
  adjustLayoutForLargeScreens(); // ajustes grandes telas
  initSalesChart();              // gráfico
  initUserProfileModals();
  console.log("Todas as inicializações do main.js concluídas.");
});