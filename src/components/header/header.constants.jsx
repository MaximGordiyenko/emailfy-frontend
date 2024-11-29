import { ROUTE } from '../../routes/routes.constants';

import { saveContent } from '../../pages/mail-builder-page/builder-script/builderTemplate';
import { AppButton } from '../button/AppButton';
import { ThemeSwitcher } from '../switchers/ThemeSwitcher';
import {
  HomeOutlined,
  DesktopOutlined,
  LineChartOutlined,
  TeamOutlined,
  SoundOutlined,
  SettingOutlined,
  ApiOutlined,
  SignatureOutlined,
  LoadingOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Select } from 'antd';
import { EmailClientSelector } from '../selects/EmailClientSelector';

export const getHeaderConfigs = (
  navigate,
  isOpenMenu,
  setIsOpenMenu,
  emailCampaignStep,
  setEmailCampaignStep,
  isSegmentationSelectedDropdown,
  handleSubmit,
  handleOpenModalSegmentation,
  selected,
  isSelectedDropdown,
) => {
  const dashboardOptions = [
    { value: '1', label: 'Year' },
    { value: '2', label: 'Month' },
    { value: '3', label: 'Week' },
    { value: '4', label: 'Day' },
  ];

  return {
    [`/${ROUTE.home}`]: {
      icon: <HomeOutlined />,
      description: 'Dashboard',
      content: () => <AppButton label={'Compare'} role="submit" onClick={() => alert('bla')} />,
    },
    [`/${ROUTE.dashboard}`]: {
      icon: <DesktopOutlined />,
      description: 'Dashboard',
      content: () => (
        <>
          <Select
            size="large"
            placeholder="Select a period"
            style={{ width: 200 }}
            options={dashboardOptions}
          />
          <EmailClientSelector placeholder={'Select Email Campaign'} />
        </>
      ),
    },
    [`/${ROUTE.analytics}`]: {
      icon: <LineChartOutlined />,
      description: 'Analytics',
      content: () => <AppButton label={'Compare'} role="submit" onClick={() => alert('bla')} />,
    },
    [`/${ROUTE.analytics}/${ROUTE.emailCampaign}`]: {
      icon: <LineChartOutlined />,
      description: 'Email campaigns',
      content: () => <AppButton label={'Compare'} role="submit" onClick={() => alert('bla')} />,
    },
    [`/${ROUTE.analytics}/${ROUTE.aTobTests}`]: {
      icon: <LineChartOutlined />,
      description: 'A / B Tests',
      content: () => <AppButton label={'Compare'} role="submit" onClick={() => alert('bla')} />,
    },
    [`/${ROUTE.audience}`]: {
      icon: <TeamOutlined />,
      description: 'Audience',
      content: () => (
        <AppButton
          label={'Add Contact'}
          role="submit"
          onClick={() => setIsOpenMenu((prev) => !prev)}
          icon={isOpenMenu ? <UpOutlined /> : <DownOutlined />}
        />
      ),
    },
    [`/${ROUTE.audience}/${ROUTE.uploadFile}`]: {
      icon: <TeamOutlined />,
      description: 'Upload file',
      content: () => (
        <>
          <AppButton label={'Save as draft'} role="submit" onClick={() => alert('bla')} />
          <AppButton
            label={'Next'}
            role="submit"
            onClick={navigate(`${ROUTE.audience}/${ROUTE.manualSegmentation}`, { replace: true })}
          />
        </>
      ),
    },
    [`/${ROUTE.audience}/${ROUTE.manualUpload}`]: {
      icon: <TeamOutlined />,
      description: 'Add contacts manually',
      content: () => (
        <>
          <AppButton label={'Save as draft'} role="submit" onClick={() => alert('Save as draft')} />
          <AppButton
            label={'Next'}
            role="submit"
            onClick={navigate(`${ROUTE.audience}/${ROUTE.manualSegmentation}`, { replace: true })}
          />
        </>
      ),
    },
    [`/${ROUTE.audience}/:id`]: {
      icon: <TeamOutlined />,
      description: 'Add contacts via file',
      content: () => (
        <>
          <AppButton
            label={'Next'}
            role="submit"
            onClick={() => navigate(`${ROUTE.audience}/${ROUTE.segmentation}`, { replace: true })}
            disabled={!'isFileUploaded'}
          />
          <AppButton
            label={'Back'}
            role="submit"
            onClick={() => navigate(`${ROUTE.audience}`, { replace: true })}
            disabled={!'isFileUploaded'}
          />
        </>
      ),
    },
    [`/${ROUTE.audience}/${ROUTE.manualSegmentation}`]: {
      icon: <TeamOutlined />,
      description: 'Add contacts via file',
      content: () => (
        <>
          <AppButton
            label={'Back'}
            role="submit"
            onClick={() => navigate(`/${ROUTE.audience}/${ROUTE.manualUpload}`, { replace: true })}
            icon={isOpenMenu ? <UpOutlined /> : <DownOutlined />}
          />
          <AppButton label={'Save as draft'} role="submit" onClick={() => alert('submit')} />
          <AppButton
            label={'Continue'}
            role="submit"
            disabled={selected?.length < 1 || !isSelectedDropdown}
            onClick={selected?.length >= 1 ? handleOpenModalSegmentation : null}
          />
        </>
      ),
    },
    [`/${ROUTE.audience}/${ROUTE.segmentation}`]: {
      icon: <TeamOutlined />,
      description: 'Segmentation',
      content: () => (
        <>
          <AppButton
            label={'Back'}
            onClick={() => navigate(`/${ROUTE.audience}/${ROUTE.manualUpload}`, { replace: true })}
          />
          <AppButton
            label={'Submit'}
            onClick={handleSubmit}
            disabled={!isSegmentationSelectedDropdown}
          />
        </>
      ),
    },
    [`/${ROUTE.campaigns}`]: {
      icon: <SoundOutlined />,
      description: 'Campaigns',
      content: () => (
        <AppButton
          label={'Add campaign'}
          onClick={() => setIsOpenMenu((prev) => !prev)}
          icon={isOpenMenu ? <UpOutlined /> : <DownOutlined />}
        />
      ),
    },
    [`/${ROUTE.campaigns}/${ROUTE.createText}`]: {
      icon: <SoundOutlined />,
      description: 'Create Text Manually',
      content: () => (
        <>
          <AppButton label={'Back'} onClick={setEmailCampaignStep(0)} />
          <AppButton
            disabled={!emailCampaignStep}
            label={emailCampaignStep ? 'Save draft' : 'Continue'}
            role="submit"
            onClick={async (newContent) => {
              await saveContent({
                subject: newContent.subject,
                content: newContent.campaign_text,
              });
            }}
          />
          <AppButton
            disabled={!emailCampaignStep}
            label={emailCampaignStep ? 'Save draft' : 'Continue'}
            role="submit"
          />
        </>
      ),
    },
    [`/${ROUTE.campaigns}/${ROUTE.createHtml}`]: {
      icon: <SoundOutlined />,
      description: 'Create new campaign',
      content: () => (
        <>
          <AppButton label={'Back'} onClick={setEmailCampaignStep(0)} />
          <AppButton
            disabled={!emailCampaignStep}
            label={!emailCampaignStep ? 'Save draft' : 'Continue'}
            role="submit"
            onClick={async (newContent) => {
              await saveContent({
                subject: newContent.subject,
                sender_name: newContent.from_email,
              });
            }}
          />
          <AppButton
            disabled={!emailCampaignStep}
            label={emailCampaignStep ? 'Save draft' : 'Continue'}
            role="submit"
          />
        </>
      ),
    },
    [`/${ROUTE.settings}`]: {
      icon: <SettingOutlined />,
      description: 'Settings',
      content: () => null,
    },
    [`/${ROUTE.settings}/${ROUTE.userInfo}`]: {
      icon: <SettingOutlined />,
      description: 'User Information',
      content: () => (
        <>
          <AppButton
            label={'User Information'}
            role="submit"
            onClick={() => alert('User Information')}
          />
          <ThemeSwitcher />
        </>
      ),
    },
    [`/${ROUTE.settings}/${ROUTE.companyInfo}`]: {
      icon: <SettingOutlined />,
      description: 'Company Information',
      content: () => (
        <AppButton
          label={'Company Information'}
          role="submit"
          onClick={() => alert('Company Information')}
        />
      ),
    },
    [`/${ROUTE.settings}/${ROUTE.domainInfo}`]: {
      icon: <SettingOutlined />,
      description: 'Domain Information',
      content: () => (
        <AppButton
          label={'Domain Information'}
          role="submit"
          onClick={() => alert('Domain Information')}
        />
      ),
    },
    [`/${ROUTE.domain}`]: {
      icon: <ApiOutlined />,
      description: 'Domain authentication',
      content: () => (
        <AppButton
          label={'Save & exit'}
          role="submit"
          onClick={() => navigate(`/${ROUTE.settings}`)}
        />
      ),
    },
    [`/${ROUTE.subscription}`]: {
      icon: <SignatureOutlined />,
      description: 'Subscription',
      content: () => (
        <AppButton
          label={'Submit Changes'}
          role="submit"
          onClick={() => navigate(`/${ROUTE.dashboard}`)}
        />
      ),
    },
    default: {
      icon: <LoadingOutlined />,
      description: 'Non Found',
      content: () => null,
    },
  };
};
