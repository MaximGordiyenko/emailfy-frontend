import './styles.css';
import { BrandLabel } from './BrandLabel';

export const BrandInput = ({
  label,
  value,
  name,
  errors,
  required,
  onChange,
  leftIcon,
  rightIcon,
  placeholder,
  className,
  style,
  bg,
}) => {
  return (
    <div className="brand-input-icon-block">
      <BrandLabel label={label} required={required} />
      <div className="brand-input-icon-wrapper">
        {leftIcon}
        {rightIcon}
        <input
          value={value}
          onChange={onChange}
          required={required}
          id="brand-field"
          type="text"
          autoComplete="off"
          style={style}
          className={`brand-input-styles${leftIcon ? ' is-active-icon' : ''}${bg ? ' input-bg-color' : ' default-input-bg-color'} ${errors?.[name] ? 'errors' : ''}${className}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
