import React, { useState, useEffect, createContext } from 'react';
import validated from '../../../../assets/images/validCheckCircle.svg';
import disabled from '../../../../assets/images/disabledCheckCircle.svg';
import voidCircle from '../../../../assets/images/voidCheckCircle.svg';
import { FirstForm } from './forms/FirstForm';
import { SecondForm } from './forms/SecondForm';
import { ThirdForm } from './forms/ThirdForm';
import { SixthForm } from './forms/SixthForm';
import { FourthForm } from './forms/FourthForm';
import { FifthForm } from './forms/FifthForm';
import {
  domainAuthSteps as steps,
  newSMTPInitialData,
} from '../../../../constants/common.constants';
import { get_new_smtp, set_smtp } from '../../../../api/settings/settings';
import * as companyInfoAPI from '../../../../api/settings/company_info';
import * as userInfoAPI from '../../../../api/settings/account';
import { getToken } from '../../../../api/API';

export const NewSmtpContext = createContext(newSMTPInitialData);

const StepProgress = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [domainName, setDomainName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [newSMTP, setNewSMTP] = useState(newSMTPInitialData);

  const onBlur = () => {
    const parsedEmail = email.split('@');
    if (parsedEmail.length > 1) {
      setIsError(parsedEmail[1] !== domainName);
    }
  };

  const handleChangeDomainName = (e) => {
    const parsedEmail = email.split('@');
    if (parsedEmail.length > 1 && parsedEmail[1] === e.target.value) {
      setIsError(false);
    }
    setDomainName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    const parsedEmail = e.target.value.split('@');
    if (parsedEmail.length > 1 && parsedEmail[1] === domainName) {
      setIsError(false);
    }
    setEmail(e.target.value);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const getCompanyName = async () => {
    const access_token = getToken('accessToken');
    const companyInfo = await companyInfoAPI.get_company_info(access_token);
    if (companyInfo?.data?.name) {
      setCompanyName(companyInfo.data.name);
    }
  };

  const getUserName = async () => {
    const access_token = getToken('accessToken');
    const userInfo = await userInfoAPI.getUserInfo(access_token);
    if (userInfo.data.username) {
      setUserName(userInfo.data.username);
    }
  };

  const getNewSmtp = async () => {
    try {
      const accessToken = getToken('accessToken');
      const { data } = await get_new_smtp(accessToken);
      setNewSMTP(data);
    } catch (error) {
      console.log('getNewSmtp error: ', error?.response?.data);
    }
  };

  const setSmtp = async () => {
    try {
      const name = companyName || userName;
      if (email && name && domainName && newSMTP.dkim_private_key) {
        const selector = email.split('@')[0];
        const accessToken = getToken('accessToken');
        const body = {
          email,
          name,
          selector,
          domain: domainName,
          dkim: newSMTP.dkim_private_key,
        };
        const response = await set_smtp(accessToken, body);
        console.log('setSmtp response: ', response);
        handleNextStep();
      }
    } catch (error) {
      console.log('setSmtp error: ', error?.response?.data);
    }
  };

  useEffect(() => {
    getCompanyName().catch();
    getUserName().catch();
    getNewSmtp().catch();
  }, []);

  useEffect(() => {
    setCompletedSteps(Array.from({ length: currentStep }).fill(true));
  }, [currentStep]);

  useEffect(() => {
    const parsedEmail = email.split('@');
    if (parsedEmail.length > 1) {
      setIsValid(parsedEmail[1] === domainName);
    }
  }, [email, domainName]);

  return (
    <NewSmtpContext.Provider value={newSMTP}>
      <div className="step-progress">
        <div className={'steps-box'}>
          {steps.map((step, index) => (
            <div key={index} className={`step ${index === currentStep ? 'current' : ''}`}>
              <p>{step.title}</p>
              <div className="status-icons">
                {completedSteps[index] && (
                  <>
                    <img src={validated} className="img-success" alt="" />
                    {index !== steps.length - 1 && <div className="line line-success" />}
                  </>
                )}
                {index === currentStep && (
                  <>
                    <img src={voidCircle} alt="" />
                    {index !== steps.length - 1 && <div className="line" />}
                  </>
                )}
                {index > currentStep && (
                  <>
                    <img src={disabled} alt="" />
                    {index !== steps.length - 1 && <div className="line" />}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={'forms'}>
          {currentStep === 0 && (
            <FirstForm
              domainName={domainName}
              email={email}
              isValid={isValid}
              isError={isError}
              onBlur={onBlur}
              onChangeDomainName={handleChangeDomainName}
              onChangeEmail={handleChangeEmail}
              handleNextStep={setSmtp}
            />
          )}
          {currentStep === 1 && <SecondForm handleNextStep={handleNextStep} />}
          {currentStep === 2 && <ThirdForm handleNextStep={handleNextStep} />}
          {currentStep === 3 && <FourthForm handleNextStep={handleNextStep} />}
          {currentStep === 4 && <FifthForm handleNextStep={handleNextStep} />}
          {currentStep === 5 && <SixthForm />}
        </div>
      </div>
    </NewSmtpContext.Provider>
  );
};

export default StepProgress;
