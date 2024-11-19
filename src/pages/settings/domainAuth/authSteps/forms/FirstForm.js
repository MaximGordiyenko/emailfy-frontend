import InputComponent from '../../../../../components/inputs/InputComponent';
import './style.scss';
import { Button } from './nextButton';

export const FirstForm = ({
  domainName,
  email,
  onChangeDomainName,
  onChangeEmail,
  handleNextStep,
  isValid,
  isError,
  onBlur,
}) => {
  return (
    <div className="form-content first-form-content">
      <p className="step-description">
        Select your corporate domain, which will be used to send email campaigns from your email
        addresses.
      </p>
      <div className="inputs-box-wrapper">
        <div className={`inputs-box ${isError ? 'inputs-error' : ''}`}>
          <InputComponent
            placeholder="Enter your domain"
            label="Domain name"
            value={domainName}
            onChange={onChangeDomainName}
            onBlur={onBlur}
          />
          <InputComponent
            placeholder="Enter your email"
            type="email"
            label="Email"
            value={email}
            onChange={onChangeEmail}
            onBlur={onBlur}
          />
        </div>
        {isError && (
          <div className="inputs-box-error">
            <span>Domain and email domain must be the same</span>
          </div>
        )}
      </div>
      <Button className="next-button" onClick={handleNextStep} name="Next" disabled={!isValid} />
    </div>
  );
};
