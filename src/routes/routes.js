import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTE } from './routes.constants.js';

import { MainLayout } from '../layouts/MainLayout.jsx';
import { DashboardPage } from '../pages/dashboard-page/DashboardPage.jsx';
import { AnalyticsPage } from '../pages/analytics-page/AnalyticsPage.jsx';
import { AuthLayout } from '../layouts/AuthLayout.jsx';
import { LoginPage } from '../pages/auth-page/LoginPage.jsx';
import { RegisterPage } from '../pages/auth-page/RegisterPage.jsx';
import { AudiencePage } from '../pages/audience-page/AudiencePage.jsx';
import { UploadPage } from '../pages/audience-page/uploadFile/UploadPage.jsx';
import { ManualUploadPage } from '../pages/audience-page/uploadManually/ManualUploadPage.jsx';
import { SegmentationPage } from '../pages/audience-page/segmentation/SegmentationPage.jsx';
import { UploadHTML } from '../pages/campaign-page/email-capmaign/UploadHTML.jsx';
import { CampaignsPage } from '../pages/campaign-page/CampaignsPage.jsx';
import { HtmlPreview } from '../pages/campaign-page/email-capmaign/HtmlPreview.jsx';
import { UploadManualText } from '../pages/campaign-page/email-capmaign/UploadManualText.jsx';
import { TextPreview } from '../pages/campaign-page/email-capmaign/TextPreview.jsx';
import { SegmentManually } from '../pages/audience-page/segmentManual/SegmentationManual.jsx';
import { TagsPage } from '../pages/tags/TagsPage.jsx';
import { ForgotPasswordPage } from '../pages/auth-page/ForgotPasswordPage.jsx';
import { EmailConfirmationPage } from '../pages/auth-page/EmailConfirmationPage.jsx';
import { DomainAuth } from '../pages/settings-page/domainAuth/DomainAuth.jsx';
import { LoggedBy2FA } from '../pages/auth-page/LoggedBy2FA.jsx';
import { MailBuilderPage } from '../pages/mail-builder-page/MailBuilderPage.jsx';
import { MailPreviewPage } from '../pages/mail-builder-page/mail-preview/MailPreviewPage.jsx';
import { SettingsPage } from '../pages/settings-page/SettingsPage.jsx';
import { PrivateRoute } from './PrivateRoute.jsx';
import { UserInformationTab } from '../components/tabs/user-info-tab/UserInformationTab.jsx';
import { CompanyInformationTab } from '../components/tabs/company-info-tab/CompanyInformationTab.jsx';
import { DomainInformationTab } from '../components/tabs/domain-info-tab/DomainInformationTab.jsx';
import { HomePage } from '../pages/home-page/HomePage.jsx';
import { SubscriptionPage } from '../pages/subscription-page/SubscriptionPage.jsx';
import { AudienceList } from '../pages/audience-page/audienceList/AudienceList.jsx';
import { CampaignsTab } from '../components/tabs/analytics-tabs/campaigns/CampaignsTab.jsx';
import { TestsTab } from '../components/tabs/analytics-tabs/aToBTest/TestsTab.jsx';
import { HomeLayout } from '../layouts/HomeLayout.jsx';
import { DisableAuthPage } from '../pages/auth-page/DisableAuthPage.jsx';
import { CampaignsList } from '../pages/campaign-page/CampaignsList.jsx';
import { MailBuilder } from '../pages/mail-builder-page/MailBuilder.jsx';
import { UploadHtmlPage } from '../pages/campaign-page/email-capmaign/UploadHTMLPage.jsx';

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
        path: `${ROUTE.audiencePage}`,
        element: (
          <PrivateRoute>
            <AudiencePage />
          </PrivateRoute>
        ),
        children: [
          {
            path: '', // Matches the parent path "/audience"
            element: <AudienceList />,
          },
          {
            path: `${ROUTE.segmentationPage}`,
            element: <SegmentationPage />,
          },
          {
            path: `${ROUTE.manualSegmentation}`,
            element: <SegmentManually />,
          },
          {
            path: `${ROUTE.manualUpload}`,
            element: <ManualUploadPage />,
          },
          {
            path: `${ROUTE.uploadFile}`,
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
            path: ``,
            element: <CampaignsList />,
          },
          {
            element: <UploadHtmlPage />,
            children: [
              {
                path: `${ROUTE.uploadHtml}`,
                element: <UploadHTML />,
              },
              {
                path: `${ROUTE.uploadHtml}/${ROUTE.htmlPreview}`,
                element: <HtmlPreview />,
              },
            ],
          },
          {
            path: `${ROUTE.createText}`,
            element: <UploadManualText />,
          },
          {
            path: `${ROUTE.createText}/${ROUTE.textPreview}`,
            element: <TextPreview />,
          },
          {
            path: `${ROUTE.mailBuilderPage}`,
            element: <MailBuilderPage />,
            children: [
              {
                path: ``,
                element: <MailBuilder />,
              },
              {
                path: `${ROUTE.mailBuilderPreview}`,
                element: <MailPreviewPage />,
              },
            ],
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
  {
    path: `${ROUTE.mailBuilderPage}/${ROUTE.mailBuilderPreview}`,
    element: <MailPreviewPage />,
  },
  {
    path: '/',
    element: <Navigate to={`${ROUTE.login}`} replace />,
  },
]);
