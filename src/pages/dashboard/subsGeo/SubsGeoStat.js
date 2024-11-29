import './style.scss';
import { useState, useEffect } from 'react';
import ProgressBarX from '../../../components/progress-bars/ProgressBarX';
import { SUBSCRIBERS_GEOGRAPHIC } from '../../../constants/statisticData';

export const SubsGeoStat = () => {
  const [value, setValue] = useState([28.43, 12.54, 19.87, 7.44, 14.95, 2.39, 14.31, 0.06]);
  return (
    <div className={'subs-list'}>
      {SUBSCRIBERS_GEOGRAPHIC.map((item, i) => {
        return (
          <div className={'subs-stat-box'} key={i}>
            <div className={'stat-tittle'}>
              <img src={item.img} alt="bla" />
              <div className={'country-name'}>{item.fullName}</div>
            </div>
            <div className={'count-subs'}>
              <div className={'percentage'}>{item.percentage}%</div>
              <div className={'count'}>({item.z})</div>
            </div>
            <ProgressBarX completed={item.percentage} />
          </div>
        );
      })}
    </div>
  );
};
