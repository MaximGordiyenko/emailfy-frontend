import React from 'react';
import './style.scss';

import Item from './Item';
import DonutChartx from '../donutChart/DonutChartx';

export default function CircleChart() {
  const data = [5194, 3681],
    subTitle1 = 'Opt in/out contacts',
    subTitle2 = '',
    showLabel = false,
    colors = ['#7E9D00', '#FF5656'],
    radius = 120,
    hole = 115,
    stroke = 1,
    strokeWidth = 10;

  return (
    <div className={'circle-chart-component'}>
      <div className={'circle-stats'}>
        <DonutChartx />
        <div className={'circle-statistic'}>
          <div className={'outer-circle-des'}>
            <div className={'line1'} />
            <div className={'outer-text'}>
              <h5>Subscribed</h5>
              <p>5194</p>
            </div>
          </div>
          <div className={'inner-circle-des'}>
            <div className={'line2'} />
            <div className={'inner-text'}>
              <h5>Unsubscribed</h5>
              <p>3630</p>
            </div>
          </div>
        </div>
        <div className={'hr'} />
        <div className={'statistic-description'}>
          <h3>Unsubscribe reasons</h3>
          <div className={'many-emails'}>
            <p>Too many emails</p>
            <span>31245</span>
          </div>
          <div className={'irrelevant-content'}>
            <p>Irrelevant content</p>
            <span>1238</span>
          </div>
          <div className={'poor-content'}>
            <p>Poor quality content</p>
            <span>5512</span>
          </div>
          <div className={'spam'}>
            <p>Spam or unsolicited emails</p>
            <span>2214</span>
          </div>
          <div className={'lack-personalize'}>
            <p>Lack of personalization</p>
            <span>123</span>
          </div>
          <div className={'other'}>
            <p>Other</p>
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
