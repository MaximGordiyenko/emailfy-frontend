import { ROUTE } from '../../routes/routes.constants';

import { saveContent } from '../../pages/mail-builder-page/builder-script/builderTemplate';

import { AppButton } from '../button/AppButton';
import { ThemeSwitcher } from '../switchers/ThemeSwitcher';
import { EmailClientSelect } from '../selects/EmailClientSelect';
import { DesktopMobileIcon } from '../icons/group-icons/DesktopMobileIcon';

import { Select } from 'antd';
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
  TagsOutlined,
  BuildOutlined,
  EyeOutlined,
  RetweetOutlined,
} from '@ant-design/icons';

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
      description: 'Home',
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
          <EmailClientSelect placeholder={'Select Email Campaign'} />
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
    [`/${ROUTE.audiencePage}`]: {
      icon: <TeamOutlined />,
      description: 'Audience',
      content: () => (
        <>
          <AppButton
            label={'Draft'}
            role="submit"
            kind={'outlined'}
            variant="default"
            onClick={() => alert('bla')}
            icon={<RetweetOutlined />}
          />
          <AppButton
            label={'Add Contact'}
            role="submit"
            onClick={() => setIsOpenMenu((prev) => !prev)}
            icon={isOpenMenu ? <UpOutlined /> : <DownOutlined />}
          />
        </>
      ),
    },
    [`/${ROUTE.audiencePage}/${ROUTE.uploadFile}`]: {
      icon: <TeamOutlined />,
      description: 'Upload file',
      content: () => (
        <>
          <AppButton label={'Save as draft'} role="submit" onClick={() => alert('bla')} />
          <AppButton
            label={'Next'}
            onClick={() => navigate(`/${ROUTE.audiencePage}/${ROUTE.segmentationPage}`)}
          />
        </>
      ),
    },
    [`/${ROUTE.audiencePage}/${ROUTE.manualUpload}`]: {
      icon: <TeamOutlined />,
      description: 'Add contacts manually',
      content: () => (
        <>
          <AppButton label={'Back'} onClick={() => navigate(`/${ROUTE.audiencePage}`)} />
          <AppButton
            label={'Next'}
            onClick={() => navigate(`/${ROUTE.audiencePage}/${ROUTE.manualSegmentation}`)}
          />
          <AppButton label={'Save as draft'} role="submit" onClick={() => alert('Save as draft')} />
        </>
      ),
    },
    // [`/${ROUTE.audiencePage}/:id`]: {
    //   icon: <TeamOutlined />,
    //   description: 'Add contacts via file',
    //   content: () => (
    //     <>
    //       <AppButton
    //         label={'Next'}
    //         role="submit"
    //         onClick={() =>
    //           navigate(`${ROUTE.audiencePage}/${ROUTE.segmentationPage}`, { replace: true })
    //         }
    //         disabled={!'isFileUploaded'}
    //       />
    //       <AppButton
    //         label={'Back'}
    //         role="submit"
    //         onClick={() => navigate(`${ROUTE.audiencePage}`, { replace: true })}
    //         disabled={!'isFileUploaded'}
    //       />
    //     </>
    //   ),
    // },
    [`/${ROUTE.audiencePage}/${ROUTE.manualSegmentation}`]: {
      icon: <TeamOutlined />,
      description: 'Add contacts via file',
      content: () => (
        <>
          <AppButton
            label={'Back'}
            role="submit"
            icon={isOpenMenu ? <UpOutlined /> : <DownOutlined />}
            // onClick={() =>
            //   navigate(`/${ROUTE.audiencePage}/${ROUTE.manualUpload}`, { replace: true })
            // }
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
    [`/${ROUTE.audiencePage}/${ROUTE.segmentationPage}`]: {
      icon: <TeamOutlined />,
      description: 'Segmentation',
      content: () => (
        <>
          <AppButton
            label={'Back'}
            // onClick={() =>
            //   navigate(`/${ROUTE.audiencePage}/${ROUTE.manualUpload}`, { replace: true })
            // }
          />
          <AppButton
            label={'Submit'}
            onClick={handleSubmit}
            disabled={!isSegmentationSelectedDropdown}
          />
        </>
      ),
    },
    [`/${ROUTE.campaignsPage}`]: {
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
    [`/${ROUTE.campaignsPage}/${ROUTE.createHtml}`]: {
      icon: <SoundOutlined />,
      description: 'Create new campaign',
      content: () => (
        <>
          <AppButton label={'Back'} onClick={() => navigate(`/${ROUTE.campaignsPage}`)} />
          <AppButton
            disabled={emailCampaignStep}
            label={emailCampaignStep ? 'Save draft' : 'Continue'}
            role="submit"
            onClick={async (newContent) => {
              await saveContent({
                subject: newContent.subject,
                sender_name: newContent.from_email,
              });
            }}
          />
          <AppButton
            disabled={emailCampaignStep}
            label={emailCampaignStep ? 'Save draft' : 'Continue'}
            role="submit"
          />
        </>
      ),
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.createHtml}/${ROUTE.htmlPreview}`]: {
      icon: <SoundOutlined />,
      description: 'HTML Preview',
      content: () => (
        <AppButton
          label={'Back'}
          onClick={() => navigate(`/${ROUTE.campaignsPage}/${ROUTE.createHtml}`)}
        />
      ),
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.createText}`]: {
      icon: <SoundOutlined />,
      description: 'Create Text Manually',
      content: () => (
        <>
          <AppButton label={'Back'} onClick={() => navigate(`/${ROUTE.campaignsPage}`)} />
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
    [`/${ROUTE.campaignsPage}/${ROUTE.createText}/${ROUTE.textPreview}`]: {
      icon: <SoundOutlined />,
      description: 'Text Preview',
      content: () => (
        <AppButton
          label={'Back'}
          onClick={() => navigate(`/${ROUTE.campaignsPage}/${ROUTE.createText}`)}
        />
      ),
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.mailBuilderPage}`]: {
      icon: <BuildOutlined />,
      description: 'Mail Builder',
      content: () => (
        <AppButton
          label={'Preview'}
          onClick={() =>
            navigate(`/${ROUTE.campaignsPage}/${ROUTE.mailBuilderPage}/${ROUTE.mailBuilderPreview}`)
          }
        />
      ),
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.mailBuilderPage}/${ROUTE.mailBuilderPreview}`]: {
      icon: <EyeOutlined />,
      description: 'Mail Preview',
      content: () => (
        <>
          <DesktopMobileIcon />
          <AppButton
            label={'Back'}
            onClick={() => navigate(`/${ROUTE.campaignsPage}/${ROUTE.mailBuilderPage}`)}
          />
        </>
      ),
    },
    [`/${ROUTE.tags}`]: {
      icon: <TagsOutlined />,
      description: 'Tags',
      content: () => (
        <>
          <AppButton
            label={'Add Tags'}
            role="submit"
            onClick={() => setIsOpenMenu((prev) => !prev)}
            icon={isOpenMenu ? <UpOutlined /> : <DownOutlined />}
          />
          <AppButton disabled={false} label={'Save and close'} role="submit" />
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
    [`/${ROUTE.settings}/${ROUTE.domainInfo}/${ROUTE.domainAuth}`]: {
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
