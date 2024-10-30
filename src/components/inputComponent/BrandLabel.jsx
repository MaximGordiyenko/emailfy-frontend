import { Asterisk } from '../asterisk/Asterisk';
import './styles.css';

export const BrandLabel = ({ label, labelInfo, required }) => {
  return (
    <>
      {label && (
        <label className="brand-label-styles" htmlFor="brand-field">
          <span>
            {label} {required && <Asterisk />}
          </span>
          {labelInfo}
        </label>
      )}
    </>
  );
};
