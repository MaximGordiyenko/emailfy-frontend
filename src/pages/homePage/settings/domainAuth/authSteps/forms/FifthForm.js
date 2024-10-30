import InputComponent from './inputCopmponent';
import { Button } from './nextButton';
import { useContext } from 'react';
import { NewSmtpContext } from '../StepProgress';

export const FifthForm = ({ handleNextStep }) => {
  const { dmarc } = useContext(NewSmtpContext);
  const { name, value } = dmarc;
  return (
    <div className="form-content fifth-form-content">
      <p className="step-description">
        Then do the same with the DMARC <span className="optional">(this step is optional)</span>
      </p>
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
