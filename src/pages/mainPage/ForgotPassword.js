import './style.scss';
import { useState } from 'react';
import { Button } from '../../components/button/Button';
import InputComponent from '../../components/inputs/InputComponent';
import { reset_password } from '../../api/settings/settings';

export const ForgotPassword = () => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleChangeEmail = (e) => {
    setEmail({ value: e.target.value, error: '' });
    setIsFilled(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    if (!email.value) {
      setEmail({ value: '', error: 'Email is require' });
      isError = true;
    }
    if (email.value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) {
      isError = true;
      setEmail({ value: '', error: 'Email incorrect' });
    }
    if (!isError) {
      setSubmittedEmail(email.value);
      setEmail({ value: '', error: '' });
      setIsSubmit(true);
      try {
        await reset_password(email.value);
        setSubmittedEmail(email.value);
        setEmail({ value: '', error: '' });
        setIsSubmit(true);
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    }
  };

  const handleResend = async () => {
    if (submittedEmail) {
      try {
        await reset_password(submittedEmail);
      } catch (error) {
        console.error('Error resending password reset:', error);
      }
    }
  };

  return (
    <div className={'forgot-pass'}>
      <div className={'form-wrapper'}>
        {isSubmit ? (
          <div className={'request-accepted'}>
            <h1 className={'accepted-req-title'}>
              Password Reset <br />
              Request Accepted
            </h1>
            <p className={'send-text'}>
              We&apos;ve sent an Email to <span>{submittedEmail}</span> with a link to reset your
              password.
            </p>
            <span className={'resend'}>
              Didn&apos;t get the email? <a onClick={handleResend}>Resend</a>
            </span>
          </div>
        ) : (
          <div className={'inner-content'}>
            <div className={'description-box'}>
              <h1 className={'forgot-title'}>Forgot password?</h1>
              <p className={'forgot-text'}>
                Please enter the email you used to create the account, and we&apos;ll send you a
                link to reset your password.
              </p>
            </div>
            <form onSubmit={handleSubmit} className={'form'}>
              <InputComponent
                placeholder={'youremail@mail.com'}
                onChange={handleChangeEmail}
                value={email.value}
                type={'text'}
                className={!isSubmit && email.error && 'wrong-input'}
                label={'Email address'}
              />
              <Button
                isSubmit={true}
                isFilled
                btnText={'Request a Password Reset'}
                disabled={!isFilled}
              />
            </form>
          </div>
        )}
      </div>
      <div className={'img-wrapper'} />
    </div>
  );
};
