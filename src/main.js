import { initSidebarToggle, initSidebarNavigation } from './components/layout/Sidebar.js';
import { handleResponsiveSidebar, adjustLayoutForLargeScreens, initUserProfileModals } from './controllers/dashboardController.js';
import { initSalesChart } from './components/charts/SalesChart.js';

document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  initSidebarNavigation();
  handleResponsiveSidebar();
  adjustLayoutForLargeScreens();
  initSalesChart();
  initUserProfileModals();
  console.log("Todas as inicializações do main.js concluídas.");
});