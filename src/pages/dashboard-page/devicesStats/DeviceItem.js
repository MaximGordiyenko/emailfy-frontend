// DeviceItem.js
import React from 'react';

const DeviceItem = ({ device }) => (
  <div className="device-item">
    <div className={'item-name'}>
      <img src={device.img} alt={device.title} />
      <div className="device-title">{device.title}</div>
    </div>
    <div className="device-value">{device.value}</div>
  </div>
);

export default DeviceItem;
