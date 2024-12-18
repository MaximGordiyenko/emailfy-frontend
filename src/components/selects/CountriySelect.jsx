import { Select, Spin, Form, Space } from 'antd';
import { Controller } from 'react-hook-form';
import './styles';

const CountrySelect = ({ label, validateStatus, help, name, tooltip, control, loading, data }) => {
  return (
    <Form.Item label={label} validateStatus={validateStatus} help={help} tooltip={tooltip}>
      <Controller
        name={name}
        control={control}
        defaultValue="US"
        render={({ field }) => (
          <Select
            {...field}
            value={field.value}
            size="large"
            placeholder="Select a country"
            defaultValue="US"
            options={data}
            loading={loading}
            showSearch
            filterOption={(input, option) => {
              const label = option?.label;
              return typeof label === 'string' && label.toLowerCase().includes(input.toLowerCase());
            }}
            onChange={(value) => field.onChange(value)} // Update form state
            notFoundContent={loading ? <Spin size="small" /> : 'No countries found'}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option?.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.label}
              </Space>
            )}
          />
        )}
      />
    </Form.Item>
  );
};

export default CountrySelect;
