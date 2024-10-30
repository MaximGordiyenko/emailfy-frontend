import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './style.scss';
import CustomDropdown from '../../../../../components/dropdownComponent/CustomDropdown';

const TimeBarChart = () => {
  const [day, setDay] = useState('Mon');
  const [timeStatVal, setTimeStatVal] = useState('Opens');
  const [dropdownVal, setDropdownVal] = useState('Opens');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // This code will run whenever `dropdownVal` or `day` changes
    if (data[dropdownVal] && data[dropdownVal][day]) {
      setChartData(data[dropdownVal][day]);
    }
  }, [dropdownVal, day]);

  const handleSelect = (selectedOption) => {
    setTimeStatVal(selectedOption);
    setDropdownVal(selectedOption); // Set the dropdown value when an option is selected
    console.log(`Selected option: ${selectedOption}`);
  };
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const data = {
    Opens: {
      Mon: [12, 19, 3, 5, 2, 3, 11, 12, 22, 1, 4, 12, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Tue: [1, 19, 3, 5, 2, 3, 11, 6, 22, 1, 4, 12, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Wed: [2, 19, 3, 5, 2, 3, 4, 12, 22, 1, 4, 2, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Thu: [12, 2, 3, 5, 2, 3, 11, 12, 22, 1, 4, 12, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Fri: [4, 19, 3, 5, 2, 5, 1, 12, 22, 1, 4, 12, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Sat: [12, 19, 3, 5, 2, 3, 11, 12, 22, 1, 7, 12, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Sun: [6, 12, 3, 5, 2, 3, 11, 12, 22, 1, 4, 12, 7, 9, 8, 4, 2, 11, 14, 19, 5, 7, 1, 8],
    },
    Clicks: {
      Mon: [1, 6, 3, 15, 2, 3, 1, 4, 8, 1, 4, 12, 1, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Tue: [1, 12, 3, 5, 2, 3, 11, 6, 22, 1, 4, 12, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Wed: [2, 19, 3, 5, 2, 3, 4, 12, 22, 1, 4, 2, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Thu: [12, 2, 3, 5, 2, 3, 11, 12, 22, 1, 4, 12, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Fri: [4, 19, 5, 5, 2, 5, 1, 1, 25, 1, 4, 12, 7, 9, 0, 8, 2, 11, 14, 19, 5, 7, 1, 8],
      Sat: [12, 19, 3, 5, 2, 3, 11, 12, 22, 1, 7, 12, 7, 9, 10, 4, 2, 11, 14, 19, 5, 7, 1, 8],
      Sun: [6, 12, 3, 5, 2, 3, 11, 12, 22, 21, 4, 12, 7, 9, 8, 4, 2, 19, 14, 19, 5, 7, 1, 8],
    },
  };

  const dropdownOptions = ['Opens', 'Clicks'];

  const seriesData = data[dropdownVal] && data[dropdownVal][day] ? data[dropdownVal][day] : [];

  const options = {
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
      },
    },
    xAxis: {
      categories: [
        '12AM',
        '1AM',
        '2AM',
        '3AM',
        '4AM',
        '5AM',
        '6AM',
        '7AM',
        '8AM',
        '9AM',
        '10AM',
        '11AM',
        '12PM',
        '1PM',
        '2PM',
        '3PM',
        '4PM',
        '5PM',
        '6PM',
        '7PM',
        '8PM',
        '9PM',
        '10PM',
        '11PM',
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Votes',
      },
    },
    series: [
      {
        name: 'Votes',
        data: chartData,
        color: '#7E9D00',
      },
    ],
  };

  return (
    <div className="time-bar-chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: {
            borderRadius: '20px',
          },
        }}
      />
      <div>
        <span className={'time-chart-title'}>Average daily</span>
        <CustomDropdown
          placeholder={timeStatVal}
          options={dropdownOptions}
          onSelect={handleSelect}
        />
      </div>
      <div className="buttons">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={`day-btn ${day === d ? 'current-day' : ''}`}>
            <div>{d}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeBarChart;
