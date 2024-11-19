import { StatCards } from './statCards/StatCards';
import CircleChart from '../graphs/circleChart/DoughnutChart';
import { LineChart } from '../graphs/lineChart/MyLineChart';
import { ImportStatsChart } from '../graphs/barCharts/importStats/ImportStatChart';
import TimeBarChart from '../graphs/timeBarChart/TimeBarChart';
import ProgressBarComponent from '../progressbarComponent/ProgressBarComponent';
import { DevicesStat } from '../devicesStats/DevicesStat';
import { LanguagesStat } from '../languageStat/LanguagesStat';
import { SubsGeoStat } from '../subsGeo/SubsGeoStat';
import MapBubbleChart from '../graphs/mapChart/MapChart';
import React from 'react';
import './style.scss';
export const OverallStatistics = () => {
  return (
    <div className="overall-tab-wrapper">
      <StatCards />
      <CircleChart />
      <LineChart />
      <div className="vertical-charts">
        <ImportStatsChart />
        <ImportStatsChart />
      </div>
      <TimeBarChart />
      <div className="pg-main-wrapper">
        <ProgressBarComponent />
        <ProgressBarComponent />
      </div>
      <div className="device-lang-stats">
        <DevicesStat />
        <LanguagesStat />
      </div>
      <div className="map-chart-wrapper">
        <div className="map-title">Subscribers Geographic</div>
        <div className="data">
          <SubsGeoStat />
          <MapBubbleChart />
        </div>
      </div>
    </div>
  );
};
