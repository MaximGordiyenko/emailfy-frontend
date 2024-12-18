import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTE } from './routes.constants';

import { MainLayout } from '../layouts/MainLayout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
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
import { TagsPage } from '../pages/tags/TagsPage';
import { ForgotPasswordPage } from '../pages/auth-page/ForgotPasswordPage';
import { EmailConfirmationPage } from '../pages/auth-page/EmailConfirmationPage';
import { DomainAuth } from '../pages/settings/domainAuth/DomainAuth';
import { LoggedBy2FA } from '../pages/auth-page/LoggedBy2FA';
import { MailBuilderPage } from '../pages/mail-builder-page/MailBuilderPage';
import { MailPreviewPage } from '../pages/mail-builder-page/mail-preview/MailPreviewPage';
import { MailBuilderLayout } from '../layouts/MailBuilderLayout';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { PrivateRoute } from './PrivateRoute';
import { UserInformationTab } from '../components/tabs/user-info-tab/UserInformationTab';
import { CompanyInformationTab } from '../components/tabs/company-info-tab/CompanyInformationTab';
import { DomainInformationTab } from '../components/tabs/domain-info-tab/DomainInformationTab';
import { HomePage } from '../pages/home/HomePage';
import { SubscriptionPage } from '../pages/subscription/SubscriptionPage';
import { AudienceList } from '../pages/audience/audienceList/AudienceList';
import { CampaignsTab } from '../components/tabs/analytics-tabs/campaigns/CampaignsTab';
import { TestsTab } from '../components/tabs/analytics-tabs/aToBTest/TestsTab';
import { HomeLayout } from '../layouts/HomeLayout';
import { DisableAuthPage } from '../pages/auth-page/DisableAuthPage';
import { CampaignsList } from '../pages/campaigns/CampaignsList';
import { MailBuilderProvider } from '../context/MailBuilderContext';

export const routes = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: `${ROUTE.registration}`,
        element: <RegisterPage />,
      },
      {
        path: `${ROUTE.login}`,
        element: <LoginPage />,
      },
      {
        path: `${ROUTE.forgotPassword}`,
        element: <ForgotPasswordPage />,
      },
      {
        path: `${ROUTE.confirmation}`,
        element: <EmailConfirmationPage />,
      },
      {
        path: `${ROUTE.disableAuth}`,
        element: <DisableAuthPage />,
      },
      {
        path: `${ROUTE.auth2FA}`,
        element: <LoggedBy2FA />,
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
        path: `${ROUTE.campaignsPage}`,
        element: (
          <PrivateRoute>
            <CampaignsPage />
          </PrivateRoute>
        ),
        children: [
          {
            path: `/${ROUTE.campaignsPage}`,
            element: <CampaignsList />,
          },
          {
            path: `${ROUTE.createHtml}`,
            element: <UploadHTML />,
          },
          {
            path: `${ROUTE.createHtml}/${ROUTE.htmlPreview}`,
            element: <CampaignsHtmlPreview />,
          },
          {
            path: `${ROUTE.createText}`,
            element: <UploadManualText />,
          },
          {
            path: `${ROUTE.createText}/${ROUTE.textPreview}`,
            element: <CampaignsTextPreview />,
          },
          {
            path: `${ROUTE.mailBuilderPage}`,
            element: (
              <MailBuilderProvider>
                <MailBuilderPage />
              </MailBuilderProvider>
            ),
          },
        ],
      },
      {
        path: `${ROUTE.tags}`,
        element: (
          <PrivateRoute>
            <TagsPage />
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
          {
            path: `/${ROUTE.settings}/${ROUTE.domainInfo}/${ROUTE.domainAuth}`,
            element: <DomainAuth />,
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
    ],
  },
  {
    element: <HomeLayout />,
    children: [
      {
        path: `/${ROUTE.home}`,
        element: <HomePage />,
      },
    ],
  },
  // {
  //   element: <MailBuilderLayout />,
  //   children: [
  //     {
  //       path: `${ROUTE.mailBuilderPage}`,
  //       element: <MailBuilderPage />,
  //     },
  //     {
  //       path: `${ROUTE.mailBuilderPage}/${ROUTE.mailBuilderPreview}`,
  //       element: <MailPreviewPage />,
  //     },
  //   ],
  // },
  {
    path: '/',
    element: <Navigate to={`${ROUTE.login}`} replace />,
  },
]);
