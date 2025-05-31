// src/components/charts/SalesChart.js

export function initSalesChart() {
  const canvas = document.getElementById('salesChart');
  if (!canvas) {
    console.error("Elemento canvas 'salesChart' não encontrado.");
    return;
  }

  // Verifica se Chart.js foi carregado (deve estar no escopo global via CDN)
  if (typeof Chart === 'undefined') {
    console.error("Chart.js não foi carregado. Verifique o link CDN no HTML.");
    return;
  }

  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar', // Mudado para 'bar' para corresponder aos dados e opções comuns
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
      datasets: [{
        label: 'R$',
        data: [1500, 1700, 1400, 1900, 2100],
        backgroundColor: '#6C63FF', // Cor sólida
        // borderColor: '#6C63FF', // Se quisesse borda
        // borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Adicionado para melhor controle da altura do canvas
      plugins: {
        legend: {
          display: false // Legenda geralmente não é necessária para um único dataset
        },
        tooltip: { // Configurações de tooltip (opcional)
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#444',
            font: { size: 12 } // Ajuste de tamanho
          },
          grid: {
            color: '#e9ecef'
          }
        },
        x: {
          ticks: {
            color: '#444',
            font: { size: 12 } // Ajuste de tamanho
          },
          grid: {
            display: false // Linhas de grade no eixo X geralmente são desabilitadas
          }
        }
      }
    }
  });
  console.log("Gráfico de vendas inicializado.");
}