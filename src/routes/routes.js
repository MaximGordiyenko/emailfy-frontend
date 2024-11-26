import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTE } from './routes.constants';

import { MainLayout } from '../layouts/MainLayout';
import { DashboardPage } from '../pages/dashboard-page/DashboardPage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../pages/auth-page/LoginPage';
import { RegisterPage } from '../pages/auth-page/RegisterPage';
import { AudiencePage } from '../pages/audience/AudiencePage';
import { UploadPage } from '../pages/audience/uploadFile/UploadPage';
import { ManualUploadPage } from '../pages/audience/uploadManually/ManualUploadPage';
import { SegmentationPage } from '../pages/audience/segmentation/SegmentationPage';
import { UploadHTML } from '../pages/campaigns/email-capmaign/UploadHTML';
import { CampaignsPage } from '../pages/campaigns/CampaignsPage';
import { CampaignsHtmlPreview } from '../pages/campaigns/email-capmaign/CampaignsHtmlPreview';
import { UploadManualText } from '../pages/campaigns/email-capmaign/UploadManualText';
import { CampaignsTextPreview } from '../pages/campaigns/email-capmaign/CampaignsTextPreview';
import { SegmentManually } from '../pages/audience/segmentManual/SegmentationManual';
import { Tags } from '../pages/tags/Tags';
import { TagsPage } from '../pages/tags/tagPage/TagsPage';
import { ForgotPassword } from '../pages/main-page/ForgotPassword';
import { VerifyPage } from '../pages/main-page/VerifyPage';
import { ConfirmationPage } from '../pages/main-page/Confirmation';
import { ResetPass } from '../pages/main-page/ResetPass';
import { DomainAuth } from '../pages/settings/domainAuth/DomainAuth';
import { LoggedBy2FA } from '../pages/main-page/LoggedBy2FA';
import { MailBuilderPage } from '../pages/mail-builder-page/MailBuilderPage';
import { MailPreviewPage } from '../pages/mail-builder-page/mail-preview/MailPreviewPage';
import { MailBuilderLayout } from '../layouts/MailBuilderLayout';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { PrivateRoute } from './PrivateRoute';
import { UserInformationTab } from '../components/tabs/user-info-tab/UserInformationTab';
import { CompanyInformationTab } from '../components/tabs/company-info-tab/CompanyInformationTab';
import { DomainInformationTab } from '../components/tabs/domain-info-tab/DomainInformationTab';
import { HomePage } from '../pages/getStarted/HomePage';
import { SubscriptionPage } from '../pages/subscription/SubscriptionPage';
import { AudienceList } from '../pages/audience/audienceList/AudienceList';
import { CampaignsTab } from '../components/analyticsTabs/campaigns/CampaignsTab';
import { TestsTab } from '../components/analyticsTabs/tests/TestsTab';

export const routes = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: `${ROUTE.login}`,
        element: <LoginPage />,
      },
      {
        path: `${ROUTE.registration}`,
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: `${ROUTE.dashboard}`,
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ROUTE.analytics}`,
        element: (
          <PrivateRoute>
            <AnalyticsPage />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={`/${ROUTE.analytics}/${ROUTE.emailCampaign}`} replace />,
          },
          {
            path: `/${ROUTE.analytics}/${ROUTE.emailCampaign}`,
            element: <CampaignsTab />,
          },
          {
            path: `/${ROUTE.analytics}/${ROUTE.aTobTests}`,
            element: <TestsTab />,
          },
        ],
      },
      {
        path: `${ROUTE.audience}`,
        element: (
          <PrivateRoute>
            <AudiencePage />
          </PrivateRoute>
        ),
        children: [
          {
            path: `/${ROUTE.audience}`,
            element: <AudienceList />,
          },
          {
            path: `/${ROUTE.audience}/${ROUTE.uploadFile}`,
            element: <UploadPage />,
          },
        ],
      },
      {
        path: `${ROUTE.campaigns}`,
        element: (
          <PrivateRoute>
            <CampaignsPage />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ROUTE.settings}`,
        element: (
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={`/${ROUTE.settings}/${ROUTE.userInfo}`} replace />,
          },
          {
            path: `/${ROUTE.settings}/${ROUTE.userInfo}`,
            element: <UserInformationTab />,
          },
          {
            path: `/${ROUTE.settings}/${ROUTE.companyInfo}`,
            element: <CompanyInformationTab />,
          },
          {
            path: `/${ROUTE.settings}/${ROUTE.domainInfo}`,
            element: <DomainInformationTab />,
          },
        ],
      },
      {
        path: `${ROUTE.subscription}`,
        element: (
          <PrivateRoute>
            <SubscriptionPage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ROUTE.audience}/${ROUTE.manualUpload}`,
        element: <ManualUploadPage />,
      },
      {
        path: `${ROUTE.audience}/${ROUTE.segmentation}`,
        element: <SegmentationPage />,
      },
      {
        path: `${ROUTE.audience}/${ROUTE.manualSegmentation}`,
        element: <SegmentManually />,
      },
      {
        path: `${ROUTE.campaigns}/${ROUTE.createHtml}`,
        element: <UploadHTML />,
      },
      {
        path: `${ROUTE.campaigns}/${ROUTE.htmlPreview}`,
        element: <CampaignsHtmlPreview />,
      },
      {
        path: `${ROUTE.campaigns}/${ROUTE.createText}`,
        element: <UploadManualText />,
      },
      {
        path: `${ROUTE.campaigns}/${ROUTE.textPreview}`,
        element: <CampaignsTextPreview />,
      },
      {
        path: `${ROUTE.tags}`,
        element: <Tags />,
      },
      {
        path: `${ROUTE.tags}/:id`,
        element: <TagsPage />,
      },
      {
        path: `${ROUTE.forgotPassword}`,
        element: <ForgotPassword />,
      },
      {
        path: `${ROUTE.verifyPage}`,
        element: <VerifyPage />,
      },
      {
        path: `${ROUTE.confirmation}/:token`,
        element: <ConfirmationPage />,
      },
      {
        path: `${ROUTE.settings}/${ROUTE.resetPassword}/:token`,
        element: <ResetPass />,
      },
      {
        path: `${ROUTE.settings}/${ROUTE.domain}`,
        element: <DomainAuth />,
      },
      {
        path: `${ROUTE.auth2FA}`,
        element: <LoggedBy2FA />,
      },
    ],
  },
  {
    path: `/${ROUTE.home}`,
    element: <HomePage />,
  },
  {
    element: <MailBuilderLayout />,
    children: [
      {
        path: `${ROUTE.mailBuilderPage}`,
        element: <MailBuilderPage />,
      },
      {
        path: `${ROUTE.mailBuilderPage}/${ROUTE.mailBuilderPreview}`,
        element: <MailPreviewPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to={`${ROUTE.login}`} replace />,
  },
]);
