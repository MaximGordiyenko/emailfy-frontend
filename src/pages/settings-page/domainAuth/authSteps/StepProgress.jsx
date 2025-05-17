import React, { useState, useEffect, createContext } from 'react';
import { FirstForm } from './forms/FirstForm.jsx';
import { SecondForm } from './forms/SecondForm.jsx';
import { ThirdForm } from './forms/ThirdForm.jsx';
import { SixthForm } from './forms/SixthForm.jsx';
import { FourthForm } from './forms/FourthForm.jsx';
import { FifthForm } from './forms/FifthForm.jsx';
import { get_new_smtp, set_smtp } from '../../../../api/settings/settings.js';
import * as companyInfoAPI from '../../../../api/settings/company_info.js';
import * as userInfoAPI from '../../../../api/settings/account.js';
import { getToken } from '../../../../api/API.js';
import { Button, Steps, Flex, Space, message } from 'antd';
import { useForm } from 'react-hook-form';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './styles.css';

export const newSMTPInitialData = {
  dkim: {
    name: '',
    ttl: 3600,
    type: 'TXT',
    value: '',
  },
  dkim_private_key: '',
  dmarc: {
    name: '',
    ttl: 3600,
    type: 'TXT',
    value: '',
  },
  spf: {
    name: '',
    ttl: 3600,
    type: 'TXT',
    value: '',
  },
};

export const NewSmtpContext = createContext(newSMTPInitialData);

export const domainAuthSteps = [
  { title: 'Start your email authentication process' },
  { title: 'Go to your domain provider’s website' },
  { title: 'Create a DKIM record' },
  { title: 'Create a SPF record' },
  { title: 'Create a DMARC record' },
  { title: 'Wait for Emailfy to check the record' },
];

const StepProgress = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [current, setCurrent] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [domainName, setDomainName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  // const [isError, setIsError] = useState(false);
  // const [isValid, setIsValid] = useState(false);
  const [newSMTP, setNewSMTP] = useState(newSMTPInitialData);

  const onBlur = () => {
    const parsedEmail = email.split('@');
    if (parsedEmail.length > 1) {
      // setIsError(parsedEmail[1] !== domainName);
    }
  };

  const handleChangeDomainName = (e) => {
    const parsedEmail = email.split('@');
    if (parsedEmail.length > 1 && parsedEmail[1] === e.target.value) {
      // setIsError(false);
    }
    setDomainName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    const parsedEmail = e.target.value.split('@');
    if (parsedEmail.length > 1 && parsedEmail[1] === domainName) {
      // setIsError(false);
    }
    setEmail(e.target.value);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, domainAuthSteps.length));
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
      // setIsValid(parsedEmail[1] === domainName);
    }
  }, [email, domainName]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(signInValidation),
    defaultValues: {
      domain: '',
      email: '',
    },
  });

  const steps = [
    {
      id: 0,
      title: 'Start your email authentication process',
      content: (
        <FirstForm
          control={control}
          errors={errors}
          // domainName={domainName}
          // email={email}
          // isValid={isValid}
          // isError={isError}
          // onBlur={onBlur}
          // onChangeDomainName={handleChangeDomainName}
          // onChangeEmail={handleChangeEmail}
          // handleNextStep={setSmtp}
        />
      ),
    },
    {
      id: 1,
      title: 'Go to your domain provider’s website',
      content: <SecondForm />,
    },
    {
      id: 2,
      title: 'Create a DKIM record',
      content: <ThirdForm control={control} errors={errors} />,
    },
    {
      id: 3,
      title: 'Create a SPF record',
      content: <FourthForm control={control} errors={errors} />,
    },
    {
      id: 4,
      title: 'Create a DMARC record',
      content: <FifthForm control={control} errors={errors} />,
    },
    {
      id: 5,
      title: 'Wait for Emailfy to check the record',
      content: <SixthForm />,
    },
  ];

  return (
    <NewSmtpContext.Provider value={newSMTP}>
      <Flex rootClassName="smtp-auth-block">
        <Steps direction="vertical" current={current} items={steps} />

        <Flex vertical gap="large">
          <Space>{steps[current].content}</Space>
          <Flex justify="space-between" gap={50}>
            {current > 0 && (
              <Button
                block
                size="large"
                onClick={() => prev()}
                icon={<ArrowLeftOutlined />}
                iconPosition="start">
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                block
                size="large"
                type="primary"
                onClick={() => next()}
                icon={<ArrowRightOutlined />}
                iconPosition="end">
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                block
                size="large"
                type="primary"
                onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>

      {/* <div className="step-progress">
        <div className={'steps-box'}>
          {domainAuthSteps.map((step, index) => (
            <div key={index} className={`step ${index === currentStep ? 'current' : ''}`}>
              <p>{step.title}</p>
              <div className="status-icons">
                {completedSteps[index] && (
                  <>
                    <img src={validated} className="img-success" alt="bla" />
                    {index !== domainAuthSteps.length - 1 && <div className="line line-success" />}
                  </>
                )}
                {index === currentStep && (
                  <>
                    <img src={voidCircle} alt="bla" />
                    {index !== domainAuthSteps.length - 1 && <div className="line" />}
                  </>
                )}
                {index > currentStep && (
                  <>
                    <img src={disabled} alt="bla" />
                    {index !== domainAuthSteps.length - 1 && <div className="line" />}
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
      </div>*/}
    </NewSmtpContext.Provider>
  );
};

export default StepProgress;
