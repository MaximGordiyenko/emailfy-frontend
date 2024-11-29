import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    spacing: [20, 20, -20, 0],
    style: {
      cursor: 'pointer', // This will make the cursor a pointer when hovering over the chart
    },
    backgroundColor: '#FAFAFA',
    height: 400,
  },
  title: {
    text: 'Audience list growth',
    align: 'left',
    x: 10,
  },
  series: [
    {
      type: 'spline',
      data: [1, 2, 3, 4, 5, 4.5, 7, 6, 9, 10],
      marker: {
        enabled: false,
        fillColor: '#FFFFFF', // This will make the point background white
        lineColor: '#7E9D00', // This will make the point border green
        lineWidth: 1,
      },
      color: '#7E9D00',
    },
  ],
  tooltip: {
    crosshairs: {
      color: '#C0C0C5',
      width: 1,
      dashStyle: 'Dash',
    },
    shared: true,
  },
  plotOptions: {
    series: {
      states: {
        hover: {
          halo: {
            size: 7,
            attributes: {
              fill: '#7E9D00', // This will make the halo green
              opacity: 1, // This will make the halo fully opaque
            },
          },
        },
      },
    },
  },
};

export const LineChart = () => (
  <HighchartsReact
    containerProps={{ style: { borderRadius: '20px', marginTop: '30px', width: '100%' } }}
    highcharts={Highcharts}
    options={options}
  />
);
