export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderRadius: {
        topLeft: 8,
        topRight: 8,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: "#313131",
        lineWidth: 1,
        borderDash: [5, 5],
      },
      beginAtZero: true,
    },
  },
};