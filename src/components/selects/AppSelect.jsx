import { Select } from 'antd';

export const AppSelect = ({ key, placeholder, options, onChange }) => {
  return (
    <Select
      key={key}
      size="large"
      showSearch
      placeholder={placeholder}
      style={{ width: 300 }}
      options={options}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      onChange={(selectedId) => onChange(selectedId)}
    />
  );
};
