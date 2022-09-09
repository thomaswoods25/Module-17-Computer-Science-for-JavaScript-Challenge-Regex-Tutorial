function calculateTotalWeight(data) {
  const totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      }
      return total;
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

function populateChart(data) {
  const durations = data.map(({ totalDuration }) => totalDuration);
  const pounds = calculateTotalWeight(data);


  const labels = data.map(({ day }) => {
    const date = new Date(day);

    // Use JavaScript's `Intl` object to help format dates
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Time Spent Working Out',
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(10, 10, 125, 0.2)',
            'rgba(35, 130, 250, 0.2)',
            'rgba(255, 69, 90, 0.2)',
            'rgba(20, 180, 180, 0.2)',
            'rgba(130, 100, 70, 0.2)',
            'rgba(255, 120, 65, 0.2)',
          ],
          borderColor: [
            'rgba(10, 10, 125, 1)',
            'rgba(35, 130, 250, 1)',
            'rgba(255, 69, 90, 1)',
            'rgba(20, 180, 180, 1)',
            'rgba(130, 100, 70, 1)',
            'rgba(255, 120, 65, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Lift Game',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);
