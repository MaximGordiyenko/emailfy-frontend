export const showRequiredLabel = (label: string, required: boolean) => (
  <span>
    {label}
    {required && <span style={{color: 'red'}}>*</span>}
  </span>
);
