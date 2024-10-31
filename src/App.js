import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { AudiencePage } from './pages/homePage/audience/AudiencePage';
import { UploadPage } from './pages/homePage/audience/uploadFile/UploadPage';
import { SegmentationPage } from './pages/homePage/audience/segmentation/SegmentationPage';
import { ManualUploadPage } from './pages/homePage/audience/uploadManually/ManualUploadPage';
import { SegmentManually } from './pages/homePage/audience/segmentManual/SegmentationManual';
import { Tags } from './pages/homePage/tags/tags';
import { TagPage } from './pages/homePage/tags/tagPage/tagPage';
import { CampaignsPage } from './pages/homePage/campaigns/CampaignsPage';
import { ForgotPassword } from './pages/mainPage/ForgotPassword';
import { VerifyPage } from './pages/mainPage/VerifyPage';
import { ConfirmationPage } from './pages/mainPage/Confirmation';
import { MailBuilderPage } from './pages/mail-builder-page/MailBuilderPage';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { SettingsPage } from './pages/homePage/settings/SettingsPage';
import { DomainAuth } from './pages/homePage/settings/domainAuth/DomainAuth';
import { LoggedBy2FA } from './pages/mainPage/LoggedBy2FA';
import { DashboardPage } from './pages/homePage/dashboard/DashboardPage';
import { AnalyticsPage } from './pages/homePage/analytics/AnalyticsPage';
import { UploadManualText } from './pages/homePage/campaigns/email-capmaign/UploadManualText';
import { UploadHTML } from './pages/homePage/campaigns/email-capmaign/UploadHTML';
import { CampaignsTextPreview } from './pages/homePage/campaigns/email-capmaign/CampaignsTextPreview';
import { CampaignsHtmlPreview } from './pages/homePage/campaigns/email-capmaign/CampaignsHtmlPreview';
import { ResetPass } from './pages/mainPage/ResetPass';
import { MailPreviewPage } from './pages/mail-builder-page/mail-preview/MailPreviewPage';
import { MailBuilderProvider } from './context/MailBuilderContext';
import { SignInPage } from './pages/auth-page/SignInPage';
import { ROUTE } from './routes/routes.constants';
import { RouterProvider } from 'react-router';
import { routes } from './routes/routes';

function App() {
  return (
    <MailBuilderProvider>
      {/*<RouterProvider router={routes} />*/}
      <Router>
        <div className={'App'}>
          <Routes>
            <Route path={`/${ROUTE.signIn}`} element={<SignInPage />} />
            <Route element={<MainLayout />}>
              <Route path={'/dashboard'} element={<DashboardPage />} />
              <Route path={'/analytics'} element={<AnalyticsPage />} />
              <Route path={'/audience/uploadmanually'} element={<ManualUploadPage />} />
            </Route>
            <Route path={'/audience'} element={<AudiencePage />} />
            <Route path={'/audience/:id'} element={<UploadPage />} />
            <Route path={'/dashboard'} element={<PrivateRoute element={<DashboardPage />} />} />
            <Route path={'/analytics'} element={<PrivateRoute element={<AnalyticsPage />} />} />
            <Route path={'/audience'} element={<PrivateRoute element={<AudiencePage />} />} />
            <Route path={'/audience/:id'} element={<PrivateRoute element={<UploadPage />} />} />
            <Route
              path={'/audience/uploadmanually'}
              element={<PrivateRoute element={<ManualUploadPage />} />}
            />
            <Route
              path={'/audience/segmentation'}
              element={<PrivateRoute element={<SegmentationPage />} />}
            />
            <Route path={'/campaigns'} element={<PrivateRoute element={<CampaignsPage />} />} />
            <Route
              path={`/campaigns/create/html`}
              element={<PrivateRoute element={<UploadHTML />} />}
            />
            <Route
              path="/campaigns/create/html/preview"
              element={<PrivateRoute element={<CampaignsHtmlPreview />} />}
            />
            <Route
              path={`/campaigns/create/text`}
              element={<PrivateRoute element={<UploadManualText />} />}
            />
            <Route
              path="/campaigns/create/text/preview"
              element={<PrivateRoute element={<CampaignsTextPreview />} />}
            />
            <Route
              path={'/audience/manualsegment'}
              element={<PrivateRoute element={<SegmentManually />} />}
            />
            <Route path={'/tags'} element={<Tags />} />
            <Route path={'/tags/:id'} element={<PrivateRoute element={<TagPage />} />} />
            <Route path={'/forgotpass'} element={<ForgotPassword />} />
            <Route path={'/verify'} element={<PrivateRoute element={<VerifyPage />} />} />
            <Route path={'/confirmation/:token'} element={<ConfirmationPage />} />
            <Route path={'/settings/password/confirm-reset/:token'} element={<ResetPass />} />
            <Route
              path={'/settings/domain_auth'}
              element={<PrivateRoute element={<DomainAuth />} />}
            />
            <Route path={'/logged_2fa'} element={<LoggedBy2FA />} />
            <Route path={'/settings'} element={<PrivateRoute element={<SettingsPage />} />} />
            <Route path={'/mail-builder-page'} element={<MailBuilderPage />} />
            <Route
              path={'/mail-builder-page/mail-preview'}
              element={<PrivateRoute element={<MailPreviewPage />} />}
            />
          </Routes>
        </div>
      </Router>
    </MailBuilderProvider>
  );
}

export default App;
