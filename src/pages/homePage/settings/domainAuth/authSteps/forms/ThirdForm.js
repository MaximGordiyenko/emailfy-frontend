import InputComponent from './inputCopmponent';
import { Button } from './nextButton';
import { useContext } from 'react';
import { NewSmtpContext } from '../StepProgress';

export const ThirdForm = ({ handleNextStep }) => {
  const { dkim } = useContext(NewSmtpContext);
  const { name, value } = dkim;
  return (
    <div className="form-content third-form-content">
      <p className="step-description">
        On your domain provider, you are going to add TXT records. These record help emailfyo direct
        your email to the right place
      </p>
      <ul className="form-content-list">
        <li className="form-content-list-item">
          After adding the new DNS record, select &quot;TXT&quot; as the type.
        </li>
        <li className="form-content-list-item">
          For <span className="bold-item">Type</span>, choose <span className="bold-item">TXT</span>{' '}
          from the drop-down menu.
        </li>
        <li className="form-content-list-item">
          For <span className="bold-item">Value</span>, copy/paste the Value info from TXT below.
        </li>
        <li className="form-content-list-item">
          For <span className="bold-item">Name</span>, copy/paste the name into from TXT below.
        </li>
        <li className="form-content-list-item">
          Leave <span className="bold-item">TTL</span> at the default settings
        </li>
        <li className="form-content-list-item">
          Click the <span className="bold-item">Save</span> button.
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
