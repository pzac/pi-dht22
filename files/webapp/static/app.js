function temperature_chart(element, data, time_tick_format = '%H:%M') {
  c3.generate({
    bindto: element,
    data: {
      x: 'x',
      xFormat: '%Y-%m-%d %H:%M:%S',
      columns: [
        ['x'].concat(data.time),
        ['temperature'].concat(data.temperature)
      ],
      axes: {temperature: 'y'},
      type: 'spline',
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: time_tick_format,
          rotate: -60
        }
      },
      y: {
        tick: {format: function (d) { return d + " C" } }
      }
    },
    point: {show: false },
    spline: {
      interpolation: {type: 'monotone'}
    }
  });
}

function humidity_chart(element, data, time_tick_format = '%H:%M') {
  c3.generate({
    bindto: element,
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d %H:%M:%S',
        columns: [
          ['x'].concat(data.time),
          ['humidity'].concat(data.humidity)
        ],
        axes: {humidity: 'y', },
        type: 'area-spline',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: time_tick_format,
            rotate: -60
          }
        },
        y: {
          tick: {format: function (d) { return d + " %" } }
        },
      },
      point: {show: false},
      spline: {
        interpolation: {type: 'monotone'}
      }
  });
}

function last_hour_charts(data) {
  temperature_chart('#temperature-chart-last-hour', data)
  humidity_chart('#humidity-chart-last-hour', data)
}

function last_24_hours_charts(data) {
  temperature_chart('#temperature-chart-last-24-hours', data)
  humidity_chart('#humidity-chart-last-24-hours', data)
}


function last_week_charts(data) {
  temperature_chart('#temperature-chart-last-week', data, '%m-%d %H:%M')
  humidity_chart('#humidity-chart-last-week', data, '%m-%d %H:%M')
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
