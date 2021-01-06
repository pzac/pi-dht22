function last_hour_charts(data) {
  c3.generate({
    bindto: '#temperature-chart-last-hour',
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d %H:%M:%S',
        columns: [
          ['x'].concat(data.time),
          ['temperature'].concat(data.temperature)
        ],
        axes: {
          temperature: 'y'
        },
        type: 'spline',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M',
            rotate: -60
          }
        },
        y: {
          tick: {
            format: function (d) { return d + " C" }
          }
        }
      },
      point: {
        show: false
      },
  });

  c3.generate({
    bindto: '#humidity-chart-last-hour',
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d %H:%M:%S',
        columns: [
          ['x'].concat(data.time),
          ['humidity'].concat(data.humidity)
        ],
        axes: {
          humidity: 'y',
        },
        type: 'spline',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M',
            rotate: -60
          }
        },
        y: {
          tick: {
            format: function (d) { return d + " %" }
          }
        },
      },
      point: {
        show: false
      },
  });

}

function last_24_hours_charts(data) {
  c3.generate({
    bindto: '#temperature-chart-last-24-hours',
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d %H:%M:%S',
        columns: [
          ['x'].concat(data.time),
          ['temperature'].concat(data.temperature)
        ],
        axes: {
          temperature: 'y'
        },
        type: 'line',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M',
            rotate: -60
          }
        },
        y: {
          tick: {
            format: function (d) { return d + " C" }
          }
        }
      },
      point: {
        show: false
      }
  });

  c3.generate({
    bindto: '#humidity-chart-last-24-hours',
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d %H:%M:%S',
        columns: [
          ['x'].concat(data.time),
          ['humidity'].concat(data.humidity)
        ],
        axes: {
          humidity: 'y',
        },
        type: 'line',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M',
            rotate: -60
          }
        },
        y: {
          tick: {
            format: function (d) { return d + " %" }
          }
        }
      },
      point: {
        show: false
      }
  });
}


function last_week_charts(data) {
  c3.generate({
    bindto: '#temperature-chart-last-week',
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d %H:%M:%S',
        columns: [
          ['x'].concat(data.time),
          ['temperature'].concat(data.temperature)
        ],
        axes: {
          temperature: 'y'
        },
        type: 'line',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d %H:%M',
            rotate: -60
          }
        },
        y: {
          tick: {
            format: function (d) { return d + " C" }
          }
        }
      },
      point: {
        show: false
      }
  });

  c3.generate({
    bindto: '#humidity-chart-last-week',
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d %H:%M:%S',
        columns: [
          ['x'].concat(data.time),
          ['humidity'].concat(data.humidity)
        ],
        axes: {
          humidity: 'y',
        },
        type: 'line',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d %H:%M',
            rotate: -60
          }
        },
        y: {
          tick: {
            format: function (d) { return d + " %" }
          }
        }
      },
      point: {
        show: false
      }
  });
}

document.addEventListener('DOMContentLoaded', function(){
  fetch('/last-hour.json')
    .then(response => response.json())
    .then(data => {last_hour_charts(data)});

  fetch('/last-24-hours.json')
    .then(response => response.json())
    .then(data => {last_24_hours_charts(data)});

  fetch('/last-week.json')
    .then(response => response.json())
    .then(data => {last_week_charts(data)});

});
