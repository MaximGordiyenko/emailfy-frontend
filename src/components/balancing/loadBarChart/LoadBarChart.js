import React, { useEffect, useMemo, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css';

const LoadBarChart = ({ activeTab, step, data, categories, onPointClick, selectedPoint }) => {
  const chartComponent = useRef(null);
  const options = useMemo(() => {
    return {
      chart: {
        type: 'column',
        spacing: [80, 30, 0, -10],
        backgroundColor: '#FAFAFA',
      },
      title: {
        text: '',
        align: 'left',
      },
      plotOptions: {
        series: {
          pointPadding: 0,
          borderRadius: 50,
          pointWidth: 8,
          cursor: 'pointer',
          point: {
            events: {
              click: onPointClick,
            },
          },
        },
      },
      xAxis: {
        categories,
        crosshair: true,
        gridLineWidth: 1,
        labels: {
          overflow: 'justify',
        },
        plotBands: [
          {
            color: '#EAEAEC',
            from: selectedPoint?.index - 0.5,
            to: selectedPoint?.index + 0.5,
          },
        ],
      },
      yAxis: {
        min: 0,
        max: 1,
        title: {
          text: 'Votes',
        },
        gridLineWidth: 1,
        tickInterval: 0.34,
      },
      series: [
        {
          data: data.map((item, index) => {
            return {
              name: item,
              color: +item >= 0.68 ? '#D36700' : +item >= 0.34 ? '#EDB833' : '#7E9D00',
              y: item,
              className: index === selectedPoint?.index ? 'highcharts-point-selected' : undefined,
            };
          }),
          name: 'Votes',
          color: '#7E9D00',
        },
      ],
    };
  }, [data, step, activeTab, selectedPoint?.index]);

  useEffect(() => {
    const chart = chartComponent.current.chart;
  }, []);

  return (
    <div className="load-bar-chart">
      <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: {
            borderRadius: '20px',
          },
        }}
      />
    </div>
  );
};

export default LoadBarChart;
