import { ROUTE } from '../../routes/routes.constants.js';

import { saveContent } from '../../pages/mail-builder-page/builder-script/builderTemplate.js';

import { AppButton } from '../button/AppButton.jsx';
import { ThemeSwitcher } from '../switchers/ThemeSwitcher.jsx';
import { EmailClientSelect } from '../selects/EmailClientSelect.jsx';

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
  RetweetOutlined
} from '@ant-design/icons';
import { DesktopIcon } from '../icons/DesktopIcon.jsx';
import { MobileIcon } from '../icons/MobileIcon.jsx';
import { useMainContext } from '../../context/MainContext.jsx';
import { PenEditIcon } from '../icons/PenEditIcon.jsx';
import { EnvelopRoundIcon } from '../icons/EnvelopRoundIcon.jsx';

export const getHeaderConfigs = (
  navigate,
  isSegmentationSelectedDropdown,
  handleSubmit,
  handleOpenModalSegmentation,
  selected,
  isSelectedDropdown
) => {
  const {
    isOpenMenuAudience, setIsOpenMenuAudience,
    isOpenMenuCampaign, setIsOpenMenuCampaign,
    isOpenSendMailModal, setIsOpenSendMailModal,
    mediaQuery, setMediaQuery,
    isOpenMenuTag, setIsOpenMenuTag,
    emailCampaignStep, setEmailCampaignStep
  } = useMainContext();
  
  const isDesktopMode = mediaQuery === 70 ? ' is-desktop' : '';
  const isMobileMode = mediaQuery === 33 ? ' is-mobile' : '';
  
  return {
    [`/${ROUTE.home}`]: {
      icon: <HomeOutlined/>,
      description: 'Home',
      content: () => <AppButton label={'Compare'} role="submit" onClick={() => alert('bla')}/>
    },
    [`/${ROUTE.dashboard}`]: {
      icon: <DesktopOutlined/>,
      description: 'Dashboard',
      content: () => (
        <>
          <Select
            size="large"
            placeholder="Select a period"
            style={{ width: 200 }}
            options={[
              { value: '1', label: 'Year' },
              { value: '2', label: 'Month' },
              { value: '3', label: 'Week' },
              { value: '4', label: 'Day' }
            ]}
          />
          <EmailClientSelect placeholder={'Select Email Campaign'}/>
        </>
      )
    },
    [`/${ROUTE.analytics}`]: {
      icon: <LineChartOutlined/>,
      description: 'Analytics',
      content: () => <AppButton label={'Compare'} role="submit" onClick={() => alert('bla')}/>
    },
    [`/${ROUTE.analytics}/${ROUTE.emailCampaign}`]: {
      icon: <LineChartOutlined/>,
      description: 'Email campaigns',
      content: () => <AppButton label={'Compare'} role="submit" onClick={() => alert('bla')}/>
    },
    [`/${ROUTE.analytics}/${ROUTE.aTobTests}`]: {
      icon: <LineChartOutlined/>,
      description: 'A / B Tests',
      content: () => <AppButton label={'Compare'} role="submit" onClick={() => alert('bla')}/>
    },
    [`/${ROUTE.audiencePage}`]: {
      icon: <TeamOutlined/>,
      description: 'Audience',
      content: () => (
        <>
          <AppButton
            label={'Draft'}
            role="submit"
            kind={'outlined'}
            variant="default"
            onClick={() => alert('bla')}
            icon={<RetweetOutlined/>}
          />
          <AppButton
            label={'Add Contact'}
            role="submit"
            onClick={() => setIsOpenMenuAudience((prev) => !prev)}
            icon={isOpenMenuAudience ? <UpOutlined/> : <DownOutlined/>}
          />
        </>
      )
    },
    [`/${ROUTE.audiencePage}/${ROUTE.uploadFile}`]: {
      icon: <TeamOutlined/>,
      description: 'Upload file',
      content: () => (
        <>
          <AppButton label={'Save as draft'} role="submit" onClick={() => alert('bla')}/>
          <AppButton
            label={'Next'}
            onClick={() => navigate(`/${ROUTE.audiencePage}/${ROUTE.segmentationPage}`)}
          />
        </>
      )
    },
    [`/${ROUTE.audiencePage}/${ROUTE.manualUpload}`]: {
      icon: <TeamOutlined/>,
      description: 'Add contacts manually',
      content: () => (
        <>
          <AppButton label={'Back'} onClick={() => navigate(`/${ROUTE.audiencePage}`)}/>
          <AppButton
            label={'Next'}
            onClick={() => navigate(`/${ROUTE.audiencePage}/${ROUTE.manualSegmentation}`)}
          />
          <AppButton label={'Save as draft'} role="submit" onClick={() => alert('Save as draft')}/>
        </>
      )
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
      icon: <TeamOutlined/>,
      description: 'Add contacts via file',
      content: () => (
        <>
          <AppButton
            label={'Back'}
            role="submit"
            // icon={isOpenMenu ? <UpOutlined/> : <DownOutlined/>}
            // onClick={() =>
            //   navigate(`/${ROUTE.audiencePage}/${ROUTE.manualUpload}`, { replace: true })
            // }
          />
          <AppButton label={'Save as draft'} role="submit" onClick={() => alert('submit')}/>
          <AppButton
            label={'Continue'}
            role="submit"
            disabled={selected?.length < 1 || !isSelectedDropdown}
            onClick={selected?.length >= 1 ? handleOpenModalSegmentation : null}
          />
        </>
      )
    },
    [`/${ROUTE.audiencePage}/${ROUTE.segmentationPage}`]: {
      icon: <TeamOutlined/>,
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
      )
    },
    [`/${ROUTE.campaignsPage}`]: {
      icon: <SoundOutlined/>,
      description: 'Campaigns',
      content: () => (
        <AppButton
          label={'Add campaign'}
          onClick={() => setIsOpenMenuCampaign((prev) => !prev)}
          icon={isOpenMenuCampaign ? <UpOutlined/> : <DownOutlined/>}
        />
      )
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.uploadHtml}`]: {
      icon: <SoundOutlined/>,
      description: 'Create new campaign',
      content: () => (
        <>
          <AppButton
            kind={'outlined'}
            variant="default"
            label={'Back'}
            onClick={() => navigate(`/${ROUTE.campaignsPage}`)}
          />
          <AppButton
            label={'Show Preview'}
            disabled={false}
            onClick={() => navigate(`/${ROUTE.campaignsPage}/${ROUTE.uploadHtml}/${ROUTE.htmlPreview}`)}
          />
        </>
      )
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.uploadHtml}/${ROUTE.htmlPreview}`]: {
      icon: <SoundOutlined/>,
      description: 'HTML Preview',
      content: () => (
        <>
          <DesktopIcon className={`${isDesktopMode}`} onClick={() => setMediaQuery(70)}/>
          <MobileIcon className={`${isMobileMode}`} onClick={() => setMediaQuery(33)}/>
          <AppButton
            label={'Back'}
            kind={'outlined'}
            variant="default"
            onClick={() => navigate(`/${ROUTE.campaignsPage}/${ROUTE.uploadHtml}`)}
          />
          <AppButton
            disabled={true}
            label={emailCampaignStep ? 'Save Draft' : 'Upload to Cloud'}
            role="submit"
            onClick={async (newContent) => {
              await saveContent({
                subject: newContent.subject,
                sender_name: newContent.from_email
              });
            }}
          />
        </>
      )
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.createText}`]: {
      icon: <SoundOutlined/>,
      description: 'Create Text Manually',
      content: () => (
        <>
          <AppButton label={'Back'} onClick={() => navigate(`/${ROUTE.campaignsPage}`)}/>
          <AppButton
            disabled={!emailCampaignStep}
            label={emailCampaignStep ? 'Save draft' : 'Continue'}
            role="submit"
            onClick={async (newContent) => {
              await saveContent({
                subject: newContent.subject,
                content: newContent.campaign_text
              });
            }}
          />
          <AppButton
            disabled={!emailCampaignStep}
            label={emailCampaignStep ? 'Save draft' : 'Continue'}
            role="submit"
          />
        </>
      )
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.createText}/${ROUTE.textPreview}`]: {
      icon: <SoundOutlined/>,
      description: 'Text Preview',
      content: () => (
        <AppButton
          label={'Back'}
          onClick={() => navigate(`/${ROUTE.campaignsPage}/${ROUTE.createText}`)}
        />
      )
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.mailBuilderPage}`]: {
      icon: <BuildOutlined/>,
      description: 'Mail Builder',
      content: () => (
        <>
          <AppButton
            kind={'outlined'}
            variant="default"
            label={'Back'}
            onClick={() => navigate(`/${ROUTE.campaignsPage}`)}
          />
          <AppButton
            label={'Preview'}
            onClick={() =>
              navigate(`/${ROUTE.campaignsPage}/${ROUTE.mailBuilderPage}/${ROUTE.mailBuilderPreview}`)
            }
          />
        </>
      )
    },
    [`/${ROUTE.campaignsPage}/${ROUTE.mailBuilderPage}/${ROUTE.mailBuilderPreview}`]: {
      icon: <EyeOutlined/>,
      description: 'Mail Preview',
      content: () => (
        <>
          <DesktopIcon className={`${isDesktopMode}`} onClick={() => setMediaQuery(70)}/>
          <MobileIcon className={`${isMobileMode}`} onClick={() => setMediaQuery(33)}/>
          <AppButton
            label={'Back'}
            onClick={() => navigate(`/${ROUTE.campaignsPage}/${ROUTE.mailBuilderPage}`)}
            icon={<PenEditIcon/>}
          />
          <AppButton
            label={'Send test email'}
            onClick={() => setIsOpenSendMailModal(!isOpenSendMailModal)}
            icon={<EnvelopRoundIcon/>}
          />
        </>
      )
    },
    [`/${ROUTE.tags}`]: {
      icon: <TagsOutlined/>,
      description: 'Tags',
      content: () => (
        <>
          <AppButton
            label={'Add Tags'}
            role="submit"
            onClick={() => setIsOpenMenuTag((prev) => !prev)}
            icon={isOpenMenuTag ? <UpOutlined/> : <DownOutlined/>}
          />
          <AppButton disabled={false} label={'Save and close'} role="submit"/>
        </>
      )
    },
    [`/${ROUTE.settings}`]: {
      icon: <SettingOutlined/>,
      description: 'Settings',
      content: () => null
    },
    [`/${ROUTE.settings}/${ROUTE.userInfo}`]: {
      icon: <SettingOutlined/>,
      description: 'User Information',
      content: () => (
        <>
          <AppButton
            label={'User Information'}
            role="submit"
            onClick={() => alert('User Information')}
          />
          <ThemeSwitcher/>
        </>
      )
    },
    [`/${ROUTE.settings}/${ROUTE.companyInfo}`]: {
      icon: <SettingOutlined/>,
      description: 'Company Information',
      content: () => (
        <AppButton
          label={'Company Information'}
          role="submit"
          onClick={() => alert('Company Information')}
        />
      )
    },
    [`/${ROUTE.settings}/${ROUTE.domainInfo}`]: {
      icon: <SettingOutlined/>,
      description: 'Domain Information',
      content: () => (
        <AppButton
          label={'Domain Information'}
          role="submit"
          onClick={() => alert('Domain Information')}
        />
      )
    },
    [`/${ROUTE.settings}/${ROUTE.domainInfo}/${ROUTE.domainAuth}`]: {
      icon: <ApiOutlined/>,
      description: 'Domain authentication',
      content: () => (
        <AppButton
          label={'Save & exit'}
          role="submit"
          onClick={() => navigate(`/${ROUTE.settings}`)}
        />
      )
    },
    [`/${ROUTE.subscription}`]: {
      icon: <SignatureOutlined/>,
      description: 'Subscription',
      content: () => (
        <AppButton
          label={'Submit Changes'}
          role="submit"
          onClick={() => navigate(`/${ROUTE.dashboard}`)}
        />
      )
    },
    default: {
      icon: <LoadingOutlined/>,
      description: 'Non Found',
      content: () => null
    }
  };
};
