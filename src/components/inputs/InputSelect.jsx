import ReactSelect from 'react-select';
import { Controller } from 'react-hook-form';
import { BrandLabel } from './BrandLabel';
import './styles.css';

export const InputSelect = ({
  name,
  value,
  onInputChange,
  control,
  errors,
  options,
  label,
  labelInfo,
  required,
  placeholder,
}) => {
  const formattedOptions = options.map((option) => ({
    value: option.id,
    label: option.name,
  }));

  const customStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      boxShadow: isFocused ? 'none' : styles.boxShadow,
      border: '1px solid #EAEAEC',
      borderRadius: 8,
      fontSize: 12,
    }),
  };

  return (
    <div className="brand-input-icon-block">
      <BrandLabel label={label} required={required} labelInfo={labelInfo} />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactSelect
            {...field}
            value={value || field.value}
            onChange={(e) => {
              field.onChange(e);
              if (onInputChange) {
                onInputChange(e);
              }
            }}
            className="react-select-container"
            classNamePrefix="react-select"
            id="to"
            // menuIsOpen={true}
            styles={customStyles}
            placeholder={placeholder}
            options={formattedOptions}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        )}
      />
      {errors?.[name] && <span className="error-message">{errors?.[name]?.message}</span>}
    </div>
  );
};
