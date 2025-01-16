import { Controller } from 'react-hook-form';
import { Input, Form } from 'antd';
import './styles.css';
import { showRequiredLabel } from '../../helpers/ShowRequiredLabel.tsx';

const { Item } = Form;

export const GroupInputs = ({
                              from_name,
                              from_email,
                              from_name_value,
                              from_mail_value,
                              placeholderName,
                              placeholderEmail,
                              addonBeforeName,
                              addonBeforeEmail,
                              control,
                              label,
                              size,
                              allowClear,
                              defaultMail,
                              required,
                              validateStatus,
                              help
                            }) => {
  return (
    <Item
      label={label && showRequiredLabel(label, required)}
      validateStatus={validateStatus}
      help={help}
      layout="vertical">
      <Controller
        name={from_name}
        control={control}
        // defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            // value={from_name_value !== null ? from_name_value : field.value}
            // onChange={(e) => field.onChange(e.target.value)}
            // ref={field.ref}
            placeholder={placeholderName}
            addonBefore={addonBeforeName}
            size={size}
            allowClear={allowClear}
          />
        )
        }
      />
      <Controller
        name={from_email}
        control={control}
        // defaultValue={defaultMail}
        render={({ field }) => (
          <Input
            {...field}
            // value={from_mail_value !== undefined ? from_mail_value : field.value}
            // onChange={(e) => field.onChange(e.target.value)}
            // ref={field.ref}
            placeholder={placeholderEmail}
            addonBefore={addonBeforeEmail}
            size={size}
            allowClear={allowClear}
          />
        )
        }
      />
    </Item>
    /*    <div className="brand-input-icon-block">
     <BrandLabel label={label} required={required} />
     <div
     className={`group-inputs-block ${isInputFocused ? 'focused' : ''} ${errors?.from_name || errors?.from_email ? 'errors' : ''}`}>
     <Controller
     name={from_name}
     control={control}
     defaultValue=""
     render={({ field }) => (
     <input
     {...field}
     value={from_name_value !== null ? from_name_value : field.value}
     id="brand-field-name"
     autoComplete="off"
     type="text"
     style={style}
     className={`brand-group-input-styles ${className}`}
     placeholder={placeholder1}
     onFocus={handleInputFocus}
     onBlur={handleInputBlur}
     onChange={(e) => {
     field.onChange(e);
     if (from_name_onChange) {
     from_name_onChange(e.target.value);
     }
     }}
     />
     )}
     />
     <div className={'hr'} />
     <Controller
     name={from_email}
     control={control}
     defaultValue={defaultMail}
     render={({ field }) => (
     <input
     {...field}
     value={from_mail_value || field.value}
     id="brand-field-mail"
     type="text"
     style={style}
     className={`brand-group-input-styles ${className}`}
     placeholder={placeholder2}
     onFocus={handleInputFocus}
     onBlur={handleInputBlur}
     onChange={(e) => {
     field.onChange(e);
     if (from_mail_onChange) {
     from_mail_onChange(e.target.value);
     }
     }}
     />
     )}
     />
     </div>
     {errors?.[from_name] && <span className="error-message">{errors?.[from_name].message}</span>}
     {errors?.[from_email] && (
     <span className="error-message">{errors?.[from_email].message}</span>
     )}
     </div>*/
  );
};
