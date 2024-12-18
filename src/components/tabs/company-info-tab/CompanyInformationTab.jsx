import { useEffect, useRef, useState } from 'react';
import * as companyInfoAPI from '../../../api/settings/company_info';
import { getToken } from '../../../api/API';
import { AuthInput } from '../../forms/AuthInput.tsx';
import { useForm } from 'react-hook-form';
import { AuthTextArea } from '../../forms/AuthTextArea.tsx';
import CountrySelect from '../../selects/CountriySelect';
import { useQuery } from '@tanstack/react-query';
import { getCountries } from '../../../api/settings/company_info';
import { Space, Flex, Form, Typography, Divider, Tooltip, Image, Modal } from 'antd';
import TextScroller from '../../scrollers/TextScroller';
import './styles.css';
const { Title, Text, Link } = Typography;

export const CompanyInformationTab = ({ onSave, setOnSave }) => {
  const parentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(signInValidation),
    defaultValues: {
      company: '',
      companyDescription: '',
      audienceDescription: '',
      country: 'US',
      city: '',
      postal: '',
      address: '',
    },
  });

  const { data: countries, isLoading: isCountriesLoading } = useQuery({
    queryKey: ['getCountries'],
    queryFn: getCountries,
  });

  console.log('countries:', countries);

  const formattedCountries = countries?.map((country) => ({
    label: country?.name,
    emoji: (
      <img
        src={country?.flags?.png} // Use placeholder if png is unavailable
        alt={`${country?.name || 'Country'} flag`}
        style={{ width: 20, height: 15, objectFit: 'cover' }}
      />
    ),
    value: country?.alpha2Code,
  }));

  useEffect(() => {
    if (!onSave) return;
    (async () => {
      const access_token = getToken('accessToken');
      // await companyInfoAPI?.set_company_info(access_token, {
      //   name,
      //   description,
      //   target_audience: targetAudience,
      //   country,
      //   city,
      //   postal_code: postalCode,
      //   address,
      // });
      setOnSave(false);
    })();
  }, [onSave]);

  useEffect(() => {
    // const modalElements = parentRef?.current?.getElementsByClassName(
    //   'styles_dropdown_items_wrapper',
    // );
    // if (modalElements?.length > 0) {
    //   parentRef?.current?.style?.height = '600px';
    //   parentRef?.current?.style?.alignItems = 'flex-start';
    // }

    (async () => {
      const access_token = getToken('accessToken');
      const companyInfo = (await companyInfoAPI?.get_company_info(access_token))?.data;
      // if (companyInfo) {
      //   setName(companyInfo.name || '');
      //   setDescription(companyInfo.description || '');
      //   setTargetAudience(companyInfo.target_audience || '');
      //   setCountry(companyInfo.country || '');
      //   setCity(companyInfo.city || '');
      //   setPostalCode(companyInfo.postal_code || '');
      //   setAddress(companyInfo.address || '');
      // }
    })();
  }, []);

  const onSubmit = (value) => {};

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <TextScroller
        onClick={() => setIsModalOpen(true)}
        text={`Following information will be utilized by AI+ for enhanced content generation and
            precise segmentation. Please take your time to provide the most comprehensive and accurate information
            available, ensuring you get the most out of Emailfy AI.`}
      />
      <Modal
        title="AI+ for you"
        footer={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}>
        <Flex gap="large">
          <Image
            width={300}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            preview={{
              src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }}
          />
          <Text>
            Following information will be utilized by AI+ for enhanced content generation and
            precise segmentation. Please take your time to provide the most comprehensive and
            accurate information available, ensuring you get the most out of Emailfy AI.
          </Text>
        </Flex>
      </Modal>

      <Flex vertical gap={40}>
        <Flex vertical gap={0}>
          <Title level={3}>Company name</Title>
          <Text>Legal company name, and, optionally, any alternatives, divided by comma.</Text>
        </Flex>
        <Flex vertical gap="small">
          <AuthInput
            name={'company'}
            label={'Company'}
            placeholder={'Enter your company name'}
            type={'text'}
            control={control}
            validateStatus={errors?.company ? 'error' : ''}
            help={errors?.company?.message}
          />
        </Flex>
      </Flex>

      <Divider />

      <Flex vertical gap={40}>
        <Flex vertical gap={0}>
          <Title level={3}>Company description</Title>
          <Text>
            What is your business about? Please provide information about your products, goals, bio,
            and any additional details you consider valuable.
          </Text>
        </Flex>
        <Flex vertical gap="small">
          <AuthTextArea
            label="Company description"
            name="companyDescription"
            placeholder={'Provide description of your company'}
            control={control}
            validateStatus={errors?.companyDescription ? 'error' : ''}
            help={errors?.companyDescription?.message}
          />
        </Flex>
      </Flex>

      <Divider />

      <Flex vertical gap={40}>
        <Flex vertical gap={0}>
          <Title level={3}>Description of the target audience</Title>
          <Text>
            Who is your desired clientele? What are their age, location, height, and pronouns? Feel
            free to provide user portraits if you have any.
          </Text>
        </Flex>
        <Flex vertical gap="small">
          <AuthTextArea
            label="Audience description"
            name="audienceDescription"
            placeholder={'Provide description of your Audience'}
            control={control}
            validateStatus={errors?.audienceDescription ? 'error' : ''}
            help={errors?.audienceDescription?.message}
          />
        </Flex>
      </Flex>

      <Flex vertical gap={40}>
        <Flex vertical gap={0}>
          <Title level={3}>Company address</Title>
          <Text>
            May be necessary to comply with laws on the protection of personal data and consumer
            rights and ensuring the legality of the mailing.
          </Text>
        </Flex>
        <Flex vertical gap="small">
          <CountrySelect
            name={'country'}
            label={'Country'}
            data={formattedCountries}
            loading={isCountriesLoading}
            control={control}
            validateStatus={errors?.country ? 'error' : ''}
            help={errors?.country?.message}
          />
          <AuthInput
            name={'city'}
            label={'City'}
            placeholder={'Enter your City name'}
            type={'text'}
            control={control}
            validateStatus={errors?.city ? 'error' : ''}
            help={errors?.city?.message}
          />
          <AuthInput
            name={'postal'}
            label={'Postal'}
            placeholder={'Enter your Postal code'}
            type={'text'}
            control={control}
            validateStatus={errors?.postal ? 'error' : ''}
            help={errors?.postal?.message}
          />
          <AuthInput
            name={'address'}
            label={'Address'}
            placeholder={'Enter Apt, suite, building, floor, etc.'}
            type={'text'}
            control={control}
            validateStatus={errors?.address ? 'error' : ''}
            help={errors?.address?.message}
          />
        </Flex>
      </Flex>
    </Form>
  );
};
