import './styles.css';

const InputComponent = ({ label, type, value, onChange, placeholder, className, ...props }) => {
  return (
    <div className={className ? className : 'input-box'}>
      <label>{label}</label>
      <input {...props} type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default InputComponent;
