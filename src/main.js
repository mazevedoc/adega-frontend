import { initApp } from './App.js';
import { initSidebarToggle, initSidebarNavigation } from './components/layout/Sidebar.js';
import {
  handleResponsiveSidebar,
  adjustLayoutForLargeScreens,
  initUserProfileModals,
} from './controllers/dashboardController.js';
import { initSalesChart } from './components/charts/SalesChart.js';

document.addEventListener('DOMContentLoaded', () => {
  const isLoginPage = document.body.classList.contains('login-page-active');

  if (isLoginPage) {
    initApp();
  } else {
    initSidebarToggle();
    initSidebarNavigation();
    handleResponsiveSidebar();
    adjustLayoutForLargeScreens();
    initSalesChart();
    initUserProfileModals();
  }
});
