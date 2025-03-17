import DeviceList from './DeviceList';
import './styles.css';
export const DevicesStat = () => {
  return (
    <div className={'dev-stat-wrapper'}>
      <div className={'device-box-title'}>Devices distribution</div>
      <div className={'table-device-data'}>
        <DeviceList deviceType="mobile_devices" />
        <DeviceList deviceType="desktop_devices" />
      </div>
    </div>
  );
};
