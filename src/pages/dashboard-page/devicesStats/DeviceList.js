import React from 'react';
import DeviceItem from './DeviceItem';
import { DEVICES_DATA } from '../../../constants/statisticData';

const DeviceList = ({ deviceType }) => {
  const devices = DEVICES_DATA[deviceType].stat_info;
  return (
    <div className="device-list">
      <div className={'list-title'}>
        <div className={'device-title'}>{DEVICES_DATA[deviceType].overall_stat.title}</div>
        <p>{DEVICES_DATA[deviceType].overall_stat.value}</p>
      </div>
      {devices.map((device, index) => (
        <DeviceItem key={index} device={device} />
      ))}
    </div>
  );
};

export default DeviceList;
