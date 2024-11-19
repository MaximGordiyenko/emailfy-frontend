import React, { useState } from 'react';
import { Button } from './nextButton';
import { CheckStatus } from './CheckStatus';

export const SixthForm = () => {
  const [checking, setChecking] = useState(false);

  const handleCheckStatus = () => {
    setChecking(true);
  };

  if (checking) {
    return <CheckStatus />;
  }

  return (
    <div className="form-content sixth-form-content">
      <p className="sixth-form-content-title">Wait for emailfy to check the records.</p>
      <div className="sixth-form-content-text">
        <span>
          It can take emailfy some time to validate that the records were created correctly, so
          close this window and go enjoy a cup of coffee. (Though it could take up to 48 hours.
          Maybe brew a pot.)
        </span>
        <br />
        <br />
        <span>
          We&apos;ll send you an email to let you know if everything is good or if we couldn&apos;t
          validate your records. Don&apos;t worry, we&apos;ll take you through how to fix any
          errors. And you can keep sending emails though Emailfy while you wait.
        </span>
      </div>
      <Button className="next-button" name={'Check status'} onClick={handleCheckStatus} />
    </div>
  );
};
