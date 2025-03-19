import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css';
import { useEffect, useRef } from 'react';

export const ImportStatsChart = () => {
  const chartComponent = useRef(null);

  useEffect(
    () => {
      if (chartComponent.current) {
        chartComponent.current.chart.reflow();
      }
    },
    [
      /* dependencies */
    ],
  );

  var originalColor;
  const options = {
    tooltip: false,
    chart: {
      type: 'column',
      spacing: [30, 30, 0, 30],
      height: 416,
      backgroundColor: '#FAFAFA',
    },
    title: {
      text: 'Import Stats',
      align: 'left',
    },
    credits: { enabled: false },
    plotOptions: {
      series: {
        pointPadding: 0,
        borderRadius: 50,
        pointWidth: 8,
        events: {
          mouseOver: function () {
            originalColor = this.color;
            this.update({
              color: '#5B93A9',
            });
          },
          mouseOut: function () {
            this.update({
              color: originalColor,
            });
          },
        },
      },
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9, 10, 11, 12, 13],
      },
    ],
  };
  return (
    <HighchartsReact
      containerProps={{ style: { width: '100%', borderRadius: '20px' } }}
      highcharts={Highcharts}
      options={options}
      style={{ padding: '20px' }}
      ref={chartComponent}
    />
  );
};
