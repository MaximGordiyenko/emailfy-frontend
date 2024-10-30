import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';

const DonutChart = () => {
  const selectedOption = useSelector((state) => state.user.selectedOption);

  const getData = () => {
    let dataset;

    switch (selectedOption) {
      case 'Year':
        dataset = { unsubscribes: 25, subscribers: 75 };
        break;
      case 'Month':
        dataset = { unsubscribes: 20, subscribers: 80 };
        break;
      case 'Week':
        dataset = { unsubscribes: 30, subscribers: 70 };
        break;
      case 'Day':
        dataset = { unsubscribes: 10, subscribers: 90 };
        break;
      default:
        dataset = { unsubscribes: 25, subscribers: 75 };
    }

    return Object.entries(dataset).map(([category, value]) => {
      return {
        name: category,
        y: value,
      };
    });
  };
  // const getData = () => {
  //   let dataset = {
  //     unsubscribes: 25,
  //     subscribers: 75,
  //   };
  //
  //   return Object.entries(dataset).map(([category, value]) => {
  //     return {
  //       name: category,
  //       y: value,
  //     };
  //   });
  // };

  useEffect(() => {
    Highcharts.chart('container', {
      colors: ['#FF5656', '#7E9D00'],
      chart: {
        type: 'pie',
        width: 300,
        height: 300,
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Opt in/out contacts',
        align: 'center',
        verticalAlign: 'middle',
        y: 10,
      },
      plotOptions: {
        line: {
          linecap: 'round',
          fill: '#FF5656',
        },
        series: {
          colorByPoint: true,
          size: '100%',
          innerSize: '95%',
          dataLabels: {
            enabled: false,
            distance: -20,
            style: {
              fontWeight: 'bold',
              fontSize: '16px',
            },
            connectorWidth: 0,
          },
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
      series: [
        {
          name: 'Subscribers',
          data: getData('1965'),
          borderWidth: 5, // Make this series bolder
        },
        {
          name: 'Unsubscribers',
          data: getData('1965'),
          borderWidth: 2, // Make this series thinner
        },
      ],
    });
  }, [selectedOption]);

  return <div id="container"></div>;
};

export default DonutChart;
