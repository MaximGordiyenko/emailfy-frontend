import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/homePage/homePage';
import { Sidebar } from './components/sidebar/Sidebar';
import { Audience } from './pages/homePage/audience/audience';
import { Upload } from './pages/homePage/audience/uploadFile/Upload';
import { Segmentation } from './pages/homePage/audience/segmentation/Segmentation';
import { UploadManually } from './pages/homePage/audience/uploadManually/ManualUpload';
import { SegmentManually } from './pages/homePage/audience/segmentManual/SegmentationManual';
import { Tags } from './pages/homePage/tags/tags';
import { TagPage } from './pages/homePage/tags/tagPage/tagPage';
import { Campaigns } from './pages/homePage/campaigns/Campaigns';
import { MainPage } from './pages/mainPage/MainPage';
import { ForgotPassword } from './pages/mainPage/ForgotPassword';
import { VerifyPage } from './pages/mainPage/VerifyPage';
import { ConfirmationPage } from './pages/mainPage/Confirmation';
import { MailBuilderPage } from './pages/mail-builder-page/MailBuilderPage';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { Settings } from './pages/homePage/settings/Settings';
import { DomainAuth } from './pages/homePage/settings/domainAuth/DomainAuth';
// import { EnableAuth } from './pages/mainPage/EnableAuth';
// import { DisableAuth } from './pages/mainPage/DisableAuth';
import { LoggedBy2FA } from './pages/mainPage/LoggedBy2FA';
import { Dashboard } from './pages/homePage/dashboard/dashboard';
import { Analytics } from './pages/homePage/analytics/Analytics';
import { UploadManualText } from './pages/homePage/campaigns/email-capmaign/UploadManualText';
import { UploadHTML } from './pages/homePage/campaigns/email-capmaign/UploadHTML';
import { CampaignsTextPreview } from './pages/homePage/campaigns/email-capmaign/CampaignsTextPreview';
import { CampaignsHtmlPreview } from './pages/homePage/campaigns/email-capmaign/CampaignsHtmlPreview';
import { ResetPass, ResetPassword } from './pages/mainPage/ResetPass';
import { MailPreviewPage } from './pages/mail-builder-page/mail-preview/MailPreviewPage';
import { MailBuilderProvider } from './context/MailBuilderContext';

function App() {
  return (
    <MailBuilderProvider>
      <Router>
        <div className={'App'}>
          <Sidebar />
          <Routes>
            <Route path={'/loginpage'} element={<MainPage />} />
            <Route path={'/'} element={<PrivateRoute element={<HomePage />} />} />
            {/*<Route path={'/dashboard'} element={<PrivateRoute element={<Dashboard />} />} />*/}
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/analytics'} element={<PrivateRoute element={<Analytics />} />} />
            <Route path={'/audience'} element={<PrivateRoute element={<Audience />} />} />
            <Route path={'/audience/:id'} element={<PrivateRoute element={<Upload />} />} />
            <Route
              path={'/audience/uploadmanually'}
              element={<PrivateRoute element={<UploadManually />} />}
            />
            <Route
              path={'/audience/segmentation'}
              element={<PrivateRoute element={<Segmentation />} />}
            />
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
            <Route path={'/tags'} element={<PrivateRoute element={<Tags />} />} />
            <Route path={'/campaigns'} element={<PrivateRoute element={<Campaigns />} />} />
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
            <Route path={'/settings'} element={<PrivateRoute element={<Settings />} />} />
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
