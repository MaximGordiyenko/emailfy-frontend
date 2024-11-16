import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTE } from './routes.constants';

import { MainLayout } from '../components/layouts/MainLayout';
import { DashboardPage } from '../pages/homePage/dashboard/DashboardPage';
import { AnalyticsPage } from '../pages/homePage/analytics/AnalyticsPage';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { LoginPage } from '../pages/auth-page/LoginPage';
import { RegisterPage } from '../pages/auth-page/RegisterPage';
import { AudiencePage } from '../pages/homePage/audience/AudiencePage';
import { UploadPage } from '../pages/homePage/audience/uploadFile/UploadPage';
import { ManualUploadPage } from '../pages/homePage/audience/uploadManually/ManualUploadPage';
import { SegmentationPage } from '../pages/homePage/audience/segmentation/SegmentationPage';
import { UploadHTML } from '../pages/homePage/campaigns/email-capmaign/UploadHTML';
import { CampaignsPage } from '../pages/homePage/campaigns/CampaignsPage';
import { CampaignsHtmlPreview } from '../pages/homePage/campaigns/email-capmaign/CampaignsHtmlPreview';
import { UploadManualText } from '../pages/homePage/campaigns/email-capmaign/UploadManualText';
import { CampaignsTextPreview } from '../pages/homePage/campaigns/email-capmaign/CampaignsTextPreview';
import { SegmentManually } from '../pages/homePage/audience/segmentManual/SegmentationManual';
import { Tags } from '../pages/homePage/tags/tags';
import { TagPage } from '../pages/homePage/tags/tagPage/tagPage';
import { ForgotPassword } from '../pages/mainPage/ForgotPassword';
import { VerifyPage } from '../pages/mainPage/VerifyPage';
import { ConfirmationPage } from '../pages/mainPage/Confirmation';
import { ResetPass } from '../pages/mainPage/ResetPass';
import { DomainAuth } from '../pages/homePage/settings/domainAuth/DomainAuth';
import { LoggedBy2FA } from '../pages/mainPage/LoggedBy2FA';
import { MailBuilderPage } from '../pages/mail-builder-page/MailBuilderPage';
import { MailPreviewPage } from '../pages/mail-builder-page/mail-preview/MailPreviewPage';
import { MailBuilderLayout } from '../components/layouts/MailBuilderLayout';
import { SettingsPage } from '../pages/homePage/settings/SettingsPage';
import { PrivateRoute } from './PrivateRoute';

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
        element: <AnalyticsPage />,
      },
      {
        path: `${ROUTE.audience}`,
        element: <AudiencePage />,
      },
      {
        path: `${ROUTE.campaigns}`,
        element: <CampaignsPage />,
      },
      {
        path: `${ROUTE.settings}`,
        element: (
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ROUTE.audience}/${ROUTE.manualUpload}`,
        element: <ManualUploadPage />,
      },
      {
        path: `${ROUTE.audience}/:id`,
        element: <UploadPage />,
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
        element: <TagPage />,
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
