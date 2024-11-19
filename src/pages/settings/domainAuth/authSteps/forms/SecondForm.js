import { Button } from './nextButton';

export const SecondForm = ({ handleNextStep }) => {
  return (
    <div className="form-content second-form-content">
      <p className="step-description">
        Open a new tab or window and navigate to the your domain provider website. Then follow these
        steps to get to your domains area.
      </p>
      <ul className="form-content-list">
        <li className="form-content-list-item">Log into your domain provider website</li>
        <li className="form-content-list-item">
          Select the domain you want to authenticate to access the Domain Settings page
        </li>
        <li className="form-content-list-item">Select Manage DNS</li>
      </ul>
      <span className="success-form-content-text">Awesome, you’re ready for the next step!</span>
      <Button className="next-button" onClick={handleNextStep} name={'Next'} />
    </div>
  );
};
