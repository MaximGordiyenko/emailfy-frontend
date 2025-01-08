import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from '../../../validation/auth.js';

import { useQuery, useMutation } from '@tanstack/react-query';
import { getToken, removeToken } from '../../../api/API.js';
import {
  getUserInfo,
  updateAccountData,
  getProfileImageById,
  uploadProfileImage,
} from '../../../api/settings/account.js';

import * as userInfoAPI from '../../../api/settings/account.js';
import * as emailSettingsAPI from '../../../api/settings/email.js';
import { ProfileImageUploader } from '../../drag-n-drop-uploader/ProfileImageUploader.jsx';

import { AppButton } from '../../button/AppButton';
import { UserInfoBlock } from './UserInfoBlock';
import { EmailInfoBlock } from './EmailInfoBlock';
import { ChangePasswordBlock } from './ChangePasswordBlock';

import { formatUserInfoApiData } from '../../../helpers/formatUserInfoApiData';

import { Space, Divider, Splitter, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const { Title, Text, Link } = Typography;

const passwordTooltips = {
  title: 'Tooltip with customize icon',
  icon: <InfoCircleOutlined />,
};

export const UserInformationTab = () => {
  const [isEnable2FA, setIsEnable2FA] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
  } = useForm({
    // resolver: yupResolver(signUpValidation),
    defaultValues: {
      email: '',
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  });

  const { data: userInfoData, isLoading: isUserLoading } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
  });

  const userDescriptions = formatUserInfoApiData(userInfoData);

  const imageId = 5;

  const { data: profileImage, isLoading: isProfileImageLoading } = useQuery({
    queryKey: ['profile-image', imageId],
    queryFn: () => getProfileImageById(imageId),
    enabled: !!imageId, // Query will only run if imageId is truthy
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cached for 30 minutes before garbage collection
  });

  // Mutation for uploading profile image
  const { mutate: uploadImage } = useMutation({
    mutationFn: (formData) => uploadProfileImage(formData),
    onSuccess: ({ message }) => {
      // toast.success(message);
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        // toast.error(error.response.data.message);
      } else {
        // toast.error('An unexpected error occurred');
      }
    },
  });

  // Mutation for updating account data
  const { mutate } = useMutation({
    mutationFn: (data) => updateAccountData(data),
    onSuccess: ({ message }) => {
      // toast.success(message);
    },
    onError: (error) => {
      removeToken('accessToken');
      if (error.response?.data?.message) {
        // toast.error(error.response.data.message);
      } else {
        // toast.error('An unexpected error occurred');
      }
    },
  });

  useEffect(() => {
    if (userInfoData?.email) setValue('email', userInfoData.email);
  }, [userInfoData, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    await mutate(data);
  };

  const token2fa = localStorage.getItem('token_2fa');
  // const { loading, error } = useSelector((state) => state.user);

  /*  useEffect(() => {
    (async () => {
      const accessToken = getToken('accessToken');
      const userInfo = (await userInfoAPI.get_user_info(accessToken)).data;
      console.log(userInfo, 'userInfo');
      setEmailState(userInfo.email);
    })();
  }, []);

  useEffect(() => {
    if (!onSave) return;
    (async () => {
      const accessToken = getToken('accessToken');
      await emailSettingsAPI.change_email(accessToken, email);
      setOnSave(false);
    })();
  }, [onSave]);*/

  const handleDisableEnableAuth = async () => {
    try {
      const accessToken = getToken('accessToken');
      const req = await fetch('/api/settings/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ auth_2fa: !isEnable2FA, code_size: 6 }),
      });
      console.log(`2FA is ${!isEnable2FA ? 'enabled' : 'disabled'}`);
      setIsEnable2FA(!isEnable2FA);
    } catch (error) {
      console.error('Error in 2FA login request', error);
    }
  };
  /*useEffect(() => {
    (async () => {
      // Fetch the saved email from Redux state when the component mounts
      const storedEmail = localStorage.getItem('userEmail');
      console.log(storedEmail, 'storedEmail');
      setSavedEmail(storedEmail);

      const accessToken = getToken('accessToken');

      fetch('/api/settings/auth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        res
          .json()
          .then((data) => {
            console.log(`2FA is ${data.auth_2fa ? 'enabled' : 'disabled'}`);
            setIsEnable2FA(data.auth_2fa);
          })
          .catch((error) => console.log(error, 'userinfo error'));
      });
    })();
  }, [email]);*/

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    let isError = false;

    if (!isError) {
      /*dispatch(registerUser(userRegisterData)).then((result) => {
        console.log(result, 'result of registering');
        if (result.payload) {
          setNewPassword({ value: '', error: '' });
          handleNav();
        }
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/verify');
        }
        if (result.meta.requestStatus === 'rejected') {
          return setReqErr('Registration request failed, check credentials or try again later');
        }
      });*/
    }
  };

  return (
    <Space direction="vertical" size="small">
      <UserInfoBlock
        uploadImage={uploadImage}
        profileImage={profileImage}
        isProfileImageLoading={isProfileImageLoading}
        itemsDescriptions={userDescriptions}
      />

      <Divider />

      <Splitter>
        <Splitter.Panel defaultSize="40%" min="20%" max="70%" resizable={false}>
          <EmailInfoBlock
            control={control}
            errors={errors}
            isLoading={isUserLoading}
            handleSubmit={handleSubmit}
            onSubmit={handleSubmit}
          />
        </Splitter.Panel>
        <Splitter.Panel>
          <ChangePasswordBlock
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isUserLoading={isUserLoading}
            passwordTooltips={passwordTooltips}
          />
        </Splitter.Panel>
      </Splitter>

      <Divider />

      <h1>Email authentication</h1>
      <p>Allows you to increase the security of your account</p>
      <AppButton role="submit" onClick={handleDisableEnableAuth}>
        {isEnable2FA ? 'Disable' : 'Enable'}
      </AppButton>
      {/*{getStoredEmail ? (
          <div className={'disable2FA'}>
            <span>
              <img src={checkCircle} alt={'checkCircle'} />
              {getStoredEmail}
            </span>
            <Button name={'Disable'} onClick={handleDisableAuth} />
          </div>
        ) : (
          <>
            {isEnable2FA ? (
              <form className={'input-email'}>
                <InputComponent placeholder={'Enter your email'} onChange={handleChangeEmail} />
                <button className={'cancel'} onClick={toggle2FA}>
                  <div>Cancel</div>
                </button>
                <button className={'save'} type={'submit'} onClick={handleSubmitEmail}>
                  <div>Save</div>
                </button>
              </form>
            ) : (
              <button className={'enable'} onClick={toggle2FA}>
                <div>Enable</div>
              </button>
            )}
          </>
        )}*/}
    </Space>
  );
};
