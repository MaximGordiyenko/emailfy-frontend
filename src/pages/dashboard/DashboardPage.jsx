import { useMainContext } from '../../context/MainContext';

import { useQuery } from '@tanstack/react-query';
import {
  getTotalEmailAnalytics,
  getCampaignStatisticsByEmailID,
  getTotalUnsubscribedEmailStatistic,
} from '../../api/dashboard/dashboard';

import { StatisticsCards } from '../../components/cards/StatisticsCards';
import { mapMetrics } from '../../helpers/metricsCalulation';

import { Splitter, Tooltip, Divider, Typography } from 'antd';
import {
  emailAnalyticMetrics,
  campaignStatisticMetrics,
  tooltipMessages,
} from './dashboard.constants';
import './styles.css';
import CircleChart from './graphs/circleChart/DoughnutChart';
import { Density } from '../../components/charts/Density';
import { MultiLineChart } from '../../components/charts/LineChart';
import DonutChart from '../../components/charts/DonutChart';
import { ChartContentWrapper } from '../../components/charts/ChartContentWrapper';

const { Title } = Typography;

export const DashboardPage = () => {
  const { selectedEmailClientID } = useMainContext();

  const { data: totalEmailAnalyticData, isLoading: totalEmailAnalyticLoading } = useQuery({
    queryKey: ['getTotalEmailAnalytics'],
    queryFn: getTotalEmailAnalytics,
    retry: 1,
    refetchOnWindowFocus: false, // Disable refetching on window focus
    onError: (error) => {},
  });

  const {
    data: totalUnsubscribedEmailStatisticData,
    isLoading: totalUnsubscribedEmailStatisticLoading,
  } = useQuery({
    queryKey: ['getTotalUnsubscribedEmailStatistic'],
    queryFn: getTotalUnsubscribedEmailStatistic,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {},
  });

  console.log(totalUnsubscribedEmailStatisticData);

  const unsubscribedReasons = totalUnsubscribedEmailStatisticData?.unsubscribedReasons || {};
  const totalSubscribeAmount = totalUnsubscribedEmailStatisticData?.totalSubscriptions || {};

  const { data: campaignStatisticsByEmailID, isLoading: campaignStatisticsLoading } = useQuery({
    queryKey: ['getCampaignStatisticsByEmailID', selectedEmailClientID],
    queryFn: () => getCampaignStatisticsByEmailID(selectedEmailClientID),
    enabled: !!selectedEmailClientID, // Conditionally enable the query
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {},
  });

  const emailAnalyticData = mapMetrics([totalEmailAnalyticData], emailAnalyticMetrics);
  const campaignStatisticData = mapMetrics([campaignStatisticsByEmailID], campaignStatisticMetrics);

  return (
    <div className="dashboard-page-container">
      <StatisticsCards
        data={emailAnalyticData}
        loading={totalEmailAnalyticLoading}
        title={`Total Email Statistic`}
        tooltipText={tooltipMessages.totalEmailStatisticText}
      />
      <StatisticsCards
        data={campaignStatisticData}
        loading={campaignStatisticsLoading}
        title={`Selected Campaign Statistic`}
        tooltipText={tooltipMessages.selectedCampaignStatisticText}
      />
      {/*<MultiLineChart />*/}
      <Divider orientation="left">
        <Tooltip title={tooltipMessages.SubscriptionText} placement="topLeft">
          <Title level={3} type="secondary">
            Subscription Statistic
          </Title>
        </Tooltip>
      </Divider>
      <Splitter>
        <Splitter.Panel defaultSize="40%" min="20%" max="70%">
          <DonutChart
            title={`Total Email Statistic`}
            loading={totalUnsubscribedEmailStatisticLoading}
            data={unsubscribedReasons}
          />
        </Splitter.Panel>
        <Splitter.Panel>
          <DonutChart
            title={`Total Email Statistic`}
            loading={totalUnsubscribedEmailStatisticLoading}
            data={totalSubscribeAmount}
          />
        </Splitter.Panel>
      </Splitter>
      {/*<Density data={data} width={400} height={400} />*/}
      {/*<CircleChart />*/}
      {/*<LineChart />*/}
      <div className="vertical-charts">
        {/*<ImportStatsChart />*/}
        {/*<ImportStatsChart />*/}
      </div>
      {/*<TimeBarChart />*/}
      <div className="pg-main-wrapper">
        {/*<ProgressBarComponent />*/}
        {/*<ProgressBarComponent />*/}
      </div>
      <div className="device-lang-stats">
        {/*<DevicesStat />*/}
        {/*<LanguagesStat />*/}
      </div>
      <div className="map-chart-wrapper">
        {/*<div className="map-title">Subscribers Geographic</div>*/}
        <div className="data">
          {/*<SubsGeoStat />*/}
          {/*<MapBubbleChart />*/}
        </div>
      </div>
    </div>
  );
};
