import InputComponent from './inputCopmponent';
import { Button } from './nextButton';
import { useContext } from 'react';
import { NewSmtpContext } from '../StepProgress';

export const FourthForm = ({ handleNextStep }) => {
  const { spf } = useContext(NewSmtpContext);
  const { name, value } = spf;
  return (
    <div className="form-content fourth-form-content">
      <p className="step-description">Do the same with the SPF record</p>
      <ul className="form-content-list">
        <li className="form-content-list-item">
          Select <strong className="bold-item">TXT</strong> as a type
        </li>
        <li className="form-content-list-item">
          Leave <strong className="bold-item">TTL</strong> at the default settings
        </li>
      </ul>
      <div className="clipboard-fields">
        <InputComponent labelText="Value" placeholderText={value} />
        <InputComponent labelText="Name" placeholderText={name} />
      </div>
      <Button className="next-button" onClick={handleNextStep} name={'Next'} />
    </div>
  );
};
