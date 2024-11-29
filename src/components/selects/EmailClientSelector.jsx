import { Select } from 'antd';
import { useMainContext } from '../../context/MainContext';

export const EmailClientSelector = ({ placeholder }) => {
  const { emailClientOptions, setSelectedEmailClientID } = useMainContext();

  return (
    <Select
      size="large"
      showSearch
      placeholder={placeholder}
      style={{ width: 300 }}
      options={emailClientOptions}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      onChange={(selectedId) => setSelectedEmailClientID(selectedId)}
    />
  );
};
