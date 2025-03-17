// import React from 'react';
// import { Chart } from 'react-google-charts';
// const VerticalBarChart = () => {
//   const data = [
//     ['Category', 'Value'],
//     ['A', 10],
//     ['B', 20],
//     ['C', 15],
//     ['D', 25],
//     ['D', 25],
//     ['D', 25],
//     ['D', 25],
//     ['D', 25],
//   ];
//
//   const chartEvents = [
//     {
//       eventName: 'ready',
//       callback: ({ chartWrapper }) => {
//         const bars = chartWrapper.getChart().getContainer().getElementsByTagName('rect');
//
//         for (let i = 0; i < bars.length; i++) {
//           const bar = bars[i];
//           bar.setAttribute('rx', '15'); // Set the x-axis corner radius
//           bar.setAttribute('ry', '15'); // Set the y-axis corner radius
//         }
//       },
//     },
//   ];
//
//   const options = {
//     chartArea: { width: '85%', height: '70%' },
//     legend: { position: 'none' },
//     colors: ['#9FCAFB'],
//     hAxis: {
//       width: 10,
//       borderRadius: 10,
//       titleTextStyle: {
//         fontName: 'MacPawFixelBold, sans-serif',
//       },
//       textStyle: {
//         fontName: 'MacPawFixelBold, sans-serif',
//       },
//     },
//     vAxis: {
//       minValue: 0,
//       titleTextStyle: {
//         fontName: 'MacPawFixelBold, sans-serif',
//       },
//       textStyle: {
//         fontName: 'MacPawFixelBold, sans-serif',
//       },
//     },
//     plotOptions: {
//       column: {
//         pointPadding: 0.2,
//         borderWidth: 0,
//       },
//     },
//
//     bar: { groupWidth: '20%' },
//   };
//
//   return (
//     <>
//       <div className={'bar-chart-title'}>
//         <h1>Subscriptions</h1>
//       </div>
//       <Chart
//         chartType="ColumnChart"
//         width="565px"
//         alignItems="flex-end"
//         height="446px"
//         data={data}
//         options={options}
//         chartEvents={chartEvents}
//       />
//     </>
//   );
// };
//
// export default VerticalBarChart;
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css';

export const SubsBarChart = () => {
  var originalColor;
  const options = {
    tooltip: false,
    chart: {
      type: 'column',
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
  return <HighchartsReact highcharts={Highcharts} options={options} style={{ padding: '20px' }} />;
};
