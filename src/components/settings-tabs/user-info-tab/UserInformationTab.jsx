import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Button } from 'antd';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from '../../../validation/auth';

import { useQuery, useMutation } from 'react-query';
import { getToken, removeToken } from '../../../api/API';
import {
  getUser,
  updateAccountData,
  getProfileImageById,
  uploadProfileImage,
} from '../../../api/settings/account';

import { AuthInput } from '../../forms/AuthInput.tsx';
import * as userInfoAPI from '../../../api/settings/account';
import * as emailSettingsAPI from '../../../api/settings/email';
import { ProfileImageUploader } from '../../drag-n-drop-uploader/ProfileImageUploader';

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

  const { data, isLoading } = useQuery('getUser', getUser);

  const imageId = 5;
  const { isLoading: isLoadingProfileImage, data: profileImage } = useQuery(
    ['profile-image', imageId],
    () => getProfileImageById(imageId),
    {
      enabled: !!imageId,
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
    },
  );

  const { mutate: uploadImage } = useMutation((formData) => uploadProfileImage(formData), {
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  const { mutate } = useMutation((data) => updateAccountData(data), {
    onSuccess({ message }) {
      toast.success(message);
    },
    onError(error) {
      removeToken('accessToken');
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  useEffect(() => {
    if (data?.email) setValue('email', data.email);
  }, [data, setValue]);

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
    <div className="user-info">
      <ProfileImageUploader
        uploadImage={uploadImage}
        profileImage={profileImage}
        isLoadingProfileImage={isLoadingProfileImage}
      />
      <div className="email-info">
        <div className={'info-title'}>
          <h1>Email information</h1>
          <p>Primary email address to be used for audience outreach</p>
        </div>
        <AuthInput
          name={'email'}
          label={'Email Address'}
          placeholder={'youremail@mail.com'}
          type={'text'}
          control={control}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        />
      </div>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="change-pass">
        <div className="change-pass-title">
          <h1>Change password</h1>
          <p>You can change your password at any time</p>
        </div>
        <div className="inputs-container">
          <AuthInput
            name={'currentPassword'}
            label={'Current password'}
            placeholder={'Enter your current password'}
            type={'password'}
            control={control}
            validateStatus={errors.currentPassword ? 'error' : ''}
            help={errors.currentPassword?.message}
          />
          <AuthInput
            name={'newPassword'}
            label={'New password'}
            placeholder={'Enter your new password'}
            type={'password'}
            control={control}
            validateStatus={errors.newPassword ? 'error' : ''}
            help={errors.newPassword?.message}
          />
          <AuthInput
            name={'repeatNewPassword'}
            label={'Repeat new password'}
            placeholder={'Enter your new password again'}
            type={'password'}
            control={control}
            validateStatus={errors.repeatNewPassword ? 'error' : ''}
            help={errors.repeatNewPassword?.message}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isLoading ? 'Loading...' : 'Change password'}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="email-auth">
        <div className={'auth-title'}>
          <h1>Email authentication</h1>
          <p>Allows you to increase the security of your account</p>
        </div>
        <button className={isEnable2FA ? 'disable' : 'enable'} onClick={handleDisableEnableAuth}>
          <span>{isEnable2FA ? 'Disable' : 'Enable'}</span>
        </button>
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
      </div>
    </div>
  );
};
