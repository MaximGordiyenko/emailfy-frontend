import { Select, Form } from 'antd';
import { Controller } from 'react-hook-form';
import { showRequiredLabel } from '../../helpers/ShowRequiredLabel.tsx';

const { Item } = Form;

export const MultiSelect = ({
                              name,
                              value,
                              allowClear,
                              control,
                              options,
                              label,
                              size,
                              required,
                              validateStatus,
                              help,
                              tooltip
                            }) => {
  return (
    <Item
      label={label && showRequiredLabel(label, required)}
      layout="vertical"
      validateStatus={validateStatus}
      help={help}
      tooltip={tooltip}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            mode="multiple"
            placeholder="Please select"
            size={size}
            allowClear={allowClear}
            options={options}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </Item>
  );
};
