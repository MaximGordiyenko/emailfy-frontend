import './styles.css';

export const ColorPicker = ({ value, onChange }) => {
  return (
    <label className="color-picker">
      <h4>Pick background color of button</h4>
      <span className="color-picker_circle" style={{ background: value }} />
      <input type="color" value={value} onChange={onChange} className="color-picker_hidden" />
    </label>
  );
};
