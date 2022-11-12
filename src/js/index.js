// import handleClosedRoutes from "./utils/handleClosedRoutes";
// handleClosedRoutes();
import index from '../styles/pages/index.scss';
import { logout, renderLogo } from "./utils/general";
import Chart from 'chart.js/auto';

logout();
renderLogo();

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [
      'Travel',
      'Health Care',
      'Garments',
      'Grocery',
      'Eating Outside',
      'Entertainments',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100, 40, 90, 230],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgba(12, 18, 30)',
        'rgba(18, 235, 190)',
        'rgba(235, 208, 18)',
      ],
      hoverOffset: 4
    }]
  }
});
