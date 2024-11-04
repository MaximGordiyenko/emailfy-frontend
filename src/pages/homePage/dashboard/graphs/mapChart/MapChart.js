import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
import { SUBSCRIBERS_GEOGRAPHIC } from '../../../../../constants/statisticData';
import { useDispatch } from 'react-redux';
import { setSubscribersData } from '../../../../../store/userSlice';

// Initialize HighchartsMap
HighchartsMap(Highcharts);

const MapBubbleChart = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const countries = ['USA', 'GBR', 'IND', 'CHN', 'BRA', 'AUS', 'Other', 'DEU'];
  const dispatch = useDispatch();

  const subscribersData = SUBSCRIBERS_GEOGRAPHIC;
  console.log(subscribersData, 'subs data');

  // Fetch map data
  useEffect(() => {
    const fetchMapData = async () => {
      const response = await fetch('https://code.highcharts.com/mapdata/custom/world.topo.json');
      console.log(response);
      const data = await response.json();
      setGeojsonData(data);
      // dispatch(setSubscribersData(subscribersData)); // Dispatch the action with subscribersData
    };
    fetchMapData();
  }, []);

  const options = {
    tooltip: {
      enabled: false,
    },
    chart: {
      width: 500,
      map: geojsonData,
      backgroundColor: '#FAFAFA',
      states: {
        hover: {
          enabled: false,
        },
        inactive: {
          opacity: 1,
        },
      },
    },
    title: null,
    subtitle: {
      enabled: false,
      display: 'none',
    },
    legend: {
      enabled: false,
    },
    mapNavigation: {
      enabled: false,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    series: [
      {
        name: 'Countries',
        color: '#E0E0E0',
        enableMouseTracking: true,
        states: {
          hover: {
            enabled: false,
            color: '#E0E0E0', // This will keep the color consistent on hover
          },
        },
      },
      {
        type: 'mapbubble',
        name: 'Subscribers',
        joinBy: ['iso-a3', 'code3'],
        data: subscribersData,
        minSize: 4,
        maxSize: '12%',
        color: '#7E9D00',
        fillColor: 'rgba(126, 157, 0, 1)',
        fillOpacity: 0.1,
        enableMouseTracking: false,
        title: {
          enabled: false,
        },
        tooltip: {
          pointFormat: '{point.name}: {point.z} subscribers',
        },
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1,
          },
        },
        dataLabels: {
          enabled: false,
          format: '{point.z}',
          style: {
            color: '#FAFAFA', // Font color
            fontSize: '13px', // Font size
            textOutline: 'none', // Removes the text outline
          },
        },
      },
    ],
  };

  return (
    <div>
      {geojsonData ? (
        <HighchartsReact highcharts={Highcharts} constructorType={'mapChart'} options={options} />
      ) : (
        <p>Loading map data...</p>
      )}
    </div>
  );
};

export default MapBubbleChart;
