import { forwardRef, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { add, format } from 'date-fns';
import LoadBarChart from './loadBarChart/LoadBarChart';
import './style.scss';
import 'react-datepicker/dist/react-datepicker.css';
import usersGroupRounded from '../../assets/images/usersGroupRounded.svg';
import fileTextSmall from '../../assets/images/fileTextSmall.svg';
import plain from '../../assets/images/plain.svg';
import plainGreen from '../../assets/images/plainGreen.svg';
import calendar from '../../assets/images/calendar.svg';
import calendarOrange from '../../assets/images/calendarOrange.svg';
import magicStick from '../../assets/images/magicStick.svg';
import magicStickPurple from '../../assets/images/magicStickPurple.svg';
import altArrowDownGrey from '../../assets/images/altArrowDownGrey.svg';
import { chartHeaderTitle, loadValues, tabs, timeInterval } from './constants';
import { timeload } from '../../api/task/tasks';
import { getAccessToken } from '../../api/auth/auth';
import { sendTestEmail } from '../../pages/mail-builder-page/builder-script/testEmail';
import { useFormContext } from 'react-hook-form';

const getTimeInterval = (date = new Date(), length = 24) => {
  const minutes = length === 96 ? 15 : length === 48 ? 30 : 60;
  const emptyArray = Array.from({ length }, () => '');
  const filledArray = [];
  emptyArray.forEach((item, idx) => {
    filledArray.push(format(add(date, { minutes: minutes * idx }), 'hh:mma'));
  });
  return filledArray;
};

const getExpDeliveryTime = (date, idx = 0, length = 24) => {
  const minutes = length === 96 ? 15 : length === 48 ? 30 : 60;
  return `${format(add(date, { minutes: minutes * idx }), 'hh:mm a')} - ${format(add(date, { minutes: minutes * idx + 20 }), 'hh:mm a')}`;
};

const CalendarButton = forwardRef(({ value, onClick }, ref) => (
  <div className="calendar-button" onClick={onClick} ref={ref}>
    <img className="calendar-button-icon-left" src={calendar} alt="" />
    <span className="calendar-button-date">{value}</span>
    <img className="calendar-button-icon-right" src={altArrowDownGrey} alt="" />
  </div>
));

export const LoadBalancing = () => {
  const [activeTab, setActiveTab] = useState(tabs.now);
  const [loadValue, setLoadValue] = useState(loadValues.low);
  const [startDate, setStartDate] = useState(new Date());
  const [timeStep, setTimeStep] = useState(timeInterval.hour);
  const [chartData, setChartData] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState({ index: 0 });
  const { watch } = useFormContext();

  const nowIcon = activeTab === tabs.now ? plainGreen : plain;
  const scheduleIcon = activeTab === tabs.schedule ? calendarOrange : calendar;
  const autoIcon = activeTab === tabs.auto ? magicStickPurple : magicStick;

  const chartCategories = useMemo(
    () =>
      getTimeInterval(
        startDate,
        timeStep === timeInterval.quarter ? 96 : timeStep === timeInterval.half ? 48 : 24,
      ),
    [startDate, timeStep],
  );

  const selectedPointHandler = (event) => {
    if (activeTab === tabs.schedule) {
      event.point.className = 'highcharts-point-selected';
      setSelectedPoint(event.point);
    }
  };

  const getChartData = async (step) => {
    if (startDate) {
      const partsCount = step === timeInterval.quarter ? 96 : step === timeInterval.half ? 48 : 24;
      const accessToken = await getAccessToken();
      const fromDate = startDate.getTime();
      const toTime = fromDate + 86400000;
      const data = await timeload(accessToken, fromDate, toTime, partsCount, true);
      setChartData(data);
    }
  };

  useEffect(() => {
    setSelectedPoint({ index: 0 });
  }, [activeTab]);

  useEffect(() => {
    if (startDate) {
      getChartData(timeStep).catch();
    }
  }, [timeStep, startDate]);

  useEffect(() => {
    if (chartData.length) {
      const average = chartData.reduce((a, b) => +a + +b, 0) / chartData.length;
      setLoadValue(
        average >= 0.68 ? loadValues.high : average >= 0.34 ? loadValues.medium : loadValues.low,
      );
    }
  }, [chartData]);

  const tabHandler = (value) => () => {
    setActiveTab(value);
    setStartDate(new Date());
  };

  const timeStepHandler = (value) => () => {
    setTimeStep(value);
  };

  const submitCampaign = () => {
    sendTestEmail(
      watch('email')
        .split(',')
        .map((email) => email.trim()),
    )
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  return (
    <div className="load-balancing-wrapper">
      <div className="load-balancing-content">
        <div className="load-balancing-title">
          <div className="label-wrapper">
            <span>2/2</span>
            <span className="label"> Sending options</span>
          </div>
          <div className="title-wrapper">
            <div className="title">
              <span>{watch('campaign_name')}</span>
            </div>
            <div className="label">
              <img src={usersGroupRounded} alt="" />
              <span>142 032</span>
            </div>
            <div className="label">
              <img src={fileTextSmall} alt="" />
              <span>15 Mb</span>
            </div>
          </div>
        </div>
        <div className="load-balancing-tabs">
          <div
            onClick={tabHandler(tabs.now)}
            className={`load-balancing-tab ${activeTab === tabs.now ? activeTab : ''}`}>
            <img className="tab-icon" src={nowIcon} alt="" />
            <div className="tab-title-wrapper">
              <span className="tab-title">Send now</span>
              <span className="tab-description">Start your campaign right now</span>
            </div>
          </div>
          <div
            onClick={tabHandler(tabs.schedule)}
            className={`load-balancing-tab ${activeTab === tabs.schedule ? activeTab : ''}`}>
            <img className="tab-icon" src={scheduleIcon} alt="" />
            <div className="tab-title-wrapper">
              <span className="tab-title">Schedule</span>
              <span className="tab-description">Choose sending time to calculate</span>
            </div>
          </div>
          <div
            onClick={tabHandler(tabs.auto)}
            className={`load-balancing-tab ${activeTab === tabs.auto ? activeTab : ''}`}>
            <img className="tab-icon" src={autoIcon} alt="" />
            <div className="tab-title-wrapper">
              <span className="tab-title">Auto-select</span>
              <span className="tab-description">Optimal campaign performance</span>
            </div>
          </div>
        </div>
        <div className="load-balancing-chart">
          <div className="chart-wrapper">
            <div className="chart-header">
              <div className="chart-header-panel">
                <div className="chart-header-title">
                  <span>{chartHeaderTitle[activeTab]}</span>
                </div>
                {activeTab === tabs.schedule && (
                  <>
                    <div className="chart-header-calendar">
                      <DatePicker
                        selected={startDate}
                        minDate={new Date()}
                        dateFormat="dd MMM, yyyy"
                        onChange={(date) => setStartDate(date)}
                        customInput={<CalendarButton />}
                      />
                    </div>
                    <div className="chart-header-time-step">
                      <span>Time step:</span>
                      <div className="chart-header-stepper">
                        <div
                          className={`stepper-item ${timeStep === timeInterval.quarter ? 'active' : ''}`}
                          onClick={timeStepHandler(timeInterval.quarter)}>
                          <span>15M</span>
                        </div>
                        <div
                          className={`stepper-item ${timeStep === timeInterval.half ? 'active' : ''}`}
                          onClick={timeStepHandler(timeInterval.half)}>
                          <span>30M</span>
                        </div>
                        <div
                          className={`stepper-item ${timeStep === timeInterval.hour ? 'active' : ''}`}
                          onClick={timeStepHandler(timeInterval.hour)}>
                          <span>1H</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="chart-header-info">
                <div className="info-title">
                  <span>Server load:</span>
                </div>
                <div className="info-item">
                  <div className="info-item-indicator indicator-low"></div>
                  <span>Low</span>
                </div>
                <div className="info-item">
                  <div className="info-item-indicator indicator-medium"></div>
                  <span>Medium</span>
                </div>
                <div className="info-item">
                  <div className="info-item-indicator indicator-high"></div>
                  <span>High</span>
                </div>
              </div>
            </div>
            <div className="chart-content">
              <LoadBarChart
                step={timeStep}
                data={chartData}
                activeTab={activeTab}
                categories={chartCategories}
                selectedPoint={selectedPoint}
                onPointClick={selectedPointHandler}
              />
            </div>
            <div className="chart-footer">
              <div className="chart-footer-info">
                <div className="chart-footer-info-item">
                  <span>Server load</span>
                  <div className="chart-footer-info-item-value">
                    <span className={`item-value-load ${loadValue}`}>{loadValue}</span>
                  </div>
                </div>
                <div className="chart-footer-info-item">
                  <span>Exp. execution time</span>
                  <div className="chart-footer-info-item-value">
                    <span>~ 20 Min</span>
                  </div>
                </div>
                <div className="chart-footer-info-item">
                  <span>Exp. delivery time</span>
                  <div className="chart-footer-info-item-value">
                    <span>
                      {getExpDeliveryTime(
                        startDate,
                        selectedPoint?.index,
                        timeStep === timeInterval.quarter
                          ? 96
                          : timeStep === timeInterval.half
                            ? 48
                            : 24,
                      )}
                    </span>
                    <span className="item-value-utc"> (UTC)</span>
                  </div>
                </div>
              </div>
              <div className="schedule-button" onClick={submitCampaign}>
                <span>{activeTab === tabs.schedule ? 'Schedule campaign' : 'Send campaign'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
