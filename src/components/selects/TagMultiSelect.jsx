import { Select, Form } from 'antd';
import { Controller } from 'react-hook-form';

export const TagMultiSelect = ({
  name,
  control,
  options,
  label,
  validateStatus,
  help,
  tooltip,
}) => {
  return (
    <Form.Item label={label} validateStatus={validateStatus} help={help} tooltip={tooltip}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value}
            mode="multiple"
            onChange={(value) => field.onChange(value)}
            placeholder="Please select"
            options={options}
          />
        )}
      />
    </Form.Item>
  );
};
