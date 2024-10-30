import { Controller } from 'react-hook-form';
import { BrandInput } from './BrandInput';

export const InputText = ({
  name,
  value,
  label,
  control,
  onInputChange,
  errors,
  required,
  leftIcon,
  rightIcon,
  className,
  style,
  placeholder,
  bg,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <BrandInput
            type="text"
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            value={value || field.value}
            onChange={(e) => {
              field.onChange(e);
              if (onInputChange) {
                onInputChange(e.target.value);
              }
            }}
            label={label}
            name={name}
            errors={errors}
            className={className}
            style={style}
            placeholder={placeholder}
            bg={bg}
            required={required}
          />
        )}
      />
      {errors?.[name] && <span className="error-message">{errors?.[name]?.message}</span>}
    </>
  );
};
