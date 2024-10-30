import { Controller } from 'react-hook-form';
import { CloseIcon } from '../interface/icons/CloseIcon';
import { BrandInput } from './BrandInput';

export const Input = ({ name, value, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <BrandInput
          type="text"
          rightIcon={<CloseIcon onClick={() => {}} />}
          value={value || field.value}
          onChange={(e) => field.onChange(e.target.value)}
          label="Recipients"
          placeholder="example@mail.com. example2@mail.com"
        />
      )}
    />
  );
};
