import { ROUTE } from '../../routes/routes.constants';

import dashboardIcon from '../../assets/images/dashboard/db-outline-dark-icon.png';
import audienceIcon from '../../assets/images/audience/audienceicon.png';
import analyticsIcon from '../../assets/images/analytic/analytics-outline.svg';
import settingsIcon from '../../assets/images/settings.png';
import campaignsIcon from '../../assets/images/plane.png';
import arrow from '../../assets/images/leftArrGreen.png';

import { saveContent } from '../../pages/mail-builder-page/builder-script/builderTemplate';

import { DateDropdown } from '../drop-down/DateDropdown';
import { Button } from '../button/Button';
import arrowUp from '../../assets/images/whiteArrUp.png';
import arrowDown from '../../assets/images/whiteArrDown.png';

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
  const dashboardOptions = ['Year', 'Month', 'Week', 'Day'];

  const onSelectDashboardOptions = (selectedOption) => {
    // dispatch(setSelectedOption(selectedOption)); // dispatch action to update Redux state
  };

  return {
    [`/${ROUTE.dashboard}`]: {
      icon: dashboardIcon,
      description: 'Dashboard',
      content: () => (
        <DateDropdown
          options={dashboardOptions}
          onSelect={onSelectDashboardOptions}
          placeholder={dashboardOptions}
        />
      ),
    },
    [`/${ROUTE.analytics}`]: {
      icon: analyticsIcon,
      description: 'Analytics',
      content: () => (
        <>
          <button className="save-btn">
            <span>Compare</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.audience}`]: {
      icon: audienceIcon,
      description: 'Audience',
      content: () => (
        <>
          <button className={'button-icon'} onClick={() => setIsOpenMenu((prev) => !prev)}>
            <span>Create Contact Menu</span>
            <img src={isOpenMenu ? arrowUp : arrowDown} className={'image-arrow-icon'} alt="bla" />
          </button>
        </>
      ),
    },
    [`/${ROUTE.audience}/${ROUTE.uploadFile}`]: {
      icon: audienceIcon,
      description: 'Upload file',
      content: () => (
        <>
          <button className="save-btn">
            <span>Save as draft</span>
          </button>
          <button
            className="save-btn"
            onClick={() =>
              navigate(`${ROUTE.audience}/${ROUTE.manualSegmentation}`, { replace: true })
            }
            disabled={false}>
            <span>Next</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.audience}/${ROUTE.manualUpload}`]: {
      icon: audienceIcon,
      description: 'Add contacts manually',
      content: () => (
        <>
          <button className="save-btn">
            <span>Save as draft</span>
          </button>
          <button
            className="save-btn"
            onClick={() =>
              navigate(`${ROUTE.audience}/${ROUTE.manualSegmentation}`, { replace: true })
            }
            disabled={false}>
            <span>Next</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.audience}/:id`]: {
      icon: audienceIcon,
      description: 'Add contacts via file',
      content: () => (
        <>
          <button
            className={'filled'}
            disabled={!'isFileUploaded'}
            onClick={() => navigate(`${ROUTE.audience}/${ROUTE.segmentation}`, { replace: true })}>
            <span>Next</span>
          </button>
          <button
            className={'filled'}
            disabled={!'isFileUploaded'}
            onClick={() => navigate(`${ROUTE.audience}`, { replace: true })}>
            <span>Back</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.audience}/${ROUTE.manualSegmentation}`]: {
      icon: audienceIcon,
      description: 'Add contacts via file',
      content: () => (
        <>
          <button
            className="back"
            onClick={() => navigate(`/${ROUTE.audience}/${ROUTE.manualUpload}`, { replace: true })}>
            <img src={arrow} alt="bla" height="18px" width="18px" />
            <span>Back</span>
          </button>
          <button className="save-as-draft">
            <span>Save as draft</span>
          </button>
          <button
            className="continue"
            disabled={selected?.length < 1 || !isSelectedDropdown}
            onClick={selected?.length >= 1 ? handleOpenModalSegmentation : null}>
            <span>Continue</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.audience}/${ROUTE.segmentation}`]: {
      icon: audienceIcon,
      description: 'Segmentation',
      content: () => (
        <>
          <button
            className="back"
            onClick={() => navigate(`/${ROUTE.audience}/${ROUTE.manualUpload}`, { replace: true })}>
            <span>Back</span>
          </button>
          <button
            disabled={!isSegmentationSelectedDropdown}
            onClick={handleSubmit}
            className="continue">
            <span>Submit</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.campaigns}`]: {
      icon: campaignsIcon,
      description: 'Campaigns',
      content: () => (
        <>
          <button onClick={() => setIsOpenMenu((prev) => !prev)}>
            <span>Create campaign</span>
            <img src={isOpenMenu ? arrowUp : arrowDown} className={'camp-arr'} alt="bla" />
          </button>
        </>
      ),
    },
    [`/${ROUTE.campaigns}/${ROUTE.createText}`]: {
      icon: analyticsIcon,
      description: 'Create Text Manually',
      content: () => (
        <>
          <Button btnText={'Back'} onClick={setEmailCampaignStep(0)} />
          <Button
            isFilled={!emailCampaignStep}
            btnText={emailCampaignStep ? 'Save draft' : 'Continue'}
            type="submit"
            onClick={async (newContent) => {
              await saveContent({
                subject: newContent.subject,
                content: newContent.campaign_text,
              });
            }}
          />
          <Button
            isFilled={!emailCampaignStep}
            btnText={emailCampaignStep ? 'Save draft' : 'Continue'}
            type="submit"
          />
        </>
      ),
    },
    [`/${ROUTE.campaigns}/${ROUTE.createHtml}`]: {
      icon: analyticsIcon,
      description: 'Create new campaign',
      content: () => (
        <>
          <Button btnText={'Back'} onClick={setEmailCampaignStep(0)} />
          <Button
            isFilled={!emailCampaignStep}
            btnText={!emailCampaignStep ? 'Save draft' : 'Continue'}
            type="submit"
            onClick={async (newContent) => {
              await saveContent({
                subject: newContent.subject,
                sender_name: newContent.from_email,
              });
            }}
          />
          <Button
            isFilled={!emailCampaignStep}
            btnText={emailCampaignStep ? 'Save draft' : 'Continue'}
            type="submit"
          />
        </>
      ),
    },
    [`/${ROUTE.settings}`]: {
      icon: settingsIcon,
      description: 'Settings',
      content: () => (
        <>
          <button className="save-btn" type="submit" onClick={() => {}}>
            <span>Save changes</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.settings}/${ROUTE.userInfo}`]: {
      icon: settingsIcon,
      description: 'User Information',
      content: () => (
        <>
          <button className="save-btn" type="submit" onClick={() => {}}>
            <span>User Info</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.settings}/${ROUTE.companyInfo}`]: {
      icon: settingsIcon,
      description: 'Company Information',
      content: () => (
        <>
          <button className="save-btn" type="submit" onClick={() => {}}>
            <span>User Info</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.settings}/${ROUTE.domainInfo}`]: {
      icon: settingsIcon,
      description: 'Domain Information',
      content: () => (
        <>
          <button className="save-btn" type="submit" onClick={() => {}}>
            <span>User Info</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.domain}`]: {
      icon: analyticsIcon,
      description: 'Domain authentication',
      content: () => (
        <>
          <button
            className="domain-auth-header-button"
            onClick={() => navigate(`/${ROUTE.settings}`)}>
            <span>Save & exit</span>
          </button>
        </>
      ),
    },
    [`/${ROUTE.subscription}`]: {
      icon: analyticsIcon,
      description: 'Subscription',
      content: () => (
        <>
          <button
            className="domain-auth-header-button"
            onClick={() => navigate(`/${ROUTE.dashboard}`)}>
            <span>Save & exit</span>
          </button>
        </>
      ),
    },
    default: {
      icon: '/path/to/default-icon.svg',
      description: 'Non Found',
      content: () => null,
    },
  };
};
