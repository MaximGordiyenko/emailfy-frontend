import { useInView } from 'react-spring';
import { RetweetOutlined } from '@ant-design/icons';
import { AppButton } from '../../components/button/AppButton.jsx';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants.js';

export const SectionFirst = () => {
  const navigate = useNavigate();
  
  const [ref, inView] = useInView({
    threshold: 0.5, // Trigger when element is 50% visible
    triggerOnce: true // Only trigger once
  });
  
  
  return (
    <div className="section first-container">
      <div className="first-row">
        <div className="hero-column">
          <div className="hero-content">
            <div className="hero-logo-container">
              <img
                className="hero-logo"
                height="40px" width="40px"
                src="https://res.cloudinary.com/maxigord/image/upload/v1738624892/Mailfly/logo_calibri_kdcqis.png"
                alt="loading-page-logo"
              />
              <p className="hero-logo-text">Emailfly</p>
            </div>
            <div className="hero-slogan-container">
              <div className="hero-slogan-title" ref={ref}>
                <span className={`fill-text ${inView ? 'fill-visible' : ''}`}>Faster.</span>
                <span className={`fill-text ${inView ? 'fill-visible' : ''}`}>Smarter.</span>
                <span className={`fill-text ${inView ? 'fill-visible' : ''}`}>Stronger.</span>
              </div>
            </div>
            <span className="hero-slogan-description">
              Efficient email marketing, reimagined and refined for unparalleled performance
            </span>
            <div className="hero-cta-container">
              <AppButton
                label={'Join the waitlist'}
                role="submit"
                kind={'filled'}
                variant="default"
                iconPosition="start"
                icon={<RetweetOutlined/>}
              />
              <AppButton
                label={'Login to try Beta'}
                role="submit"
                kind={'filled'}
                variant="default"
                iconPosition="start"
                onClick={() => navigate(`/${ROUTE.login}`)}
                icon={<RetweetOutlined/>}
              />
            </div>
          </div>
        </div>
        <div className="hero-column">
          <div className="hero-images-container">
            <div className="hero-images-row-2">
              <div className="hero-image-wrapper hero-image-2"
                   style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}
                       className="hero-video-2">
                  <source
                    src="https://res.cloudinary.com/maxigord/video/upload/v1745076421/Mailfly/Envelopes.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="hero-image-wrapper hero-image-3"
                   style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}
                       className="hero-video-3">
                  <source
                    src="https://res.cloudinary.com/maxigord/video/upload/v1745076429/Mailfly/Rocket.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="hero-image-wrapper hero-image-4"
                   style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}
                       className="hero-video-4">
                  <source
                    src="https://res.cloudinary.com/maxigord/video/upload/v1745076413/Mailfly/Dollars.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
            <div className="hero-images-row-3">
              <div className="hero-image-wrapper hero-image-5"
                   style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}
                       className="hero-video-5"
                       style={{ borderRadius: '999px', overflow: "hidden" }}>
                  <source
                    src="https://res.cloudinary.com/maxigord/video/upload/v1745076406/Mailfly/Dinosaur.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="hero-image-wrapper hero-image-6"
                   style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}
                       className="hero-video-6">
                  <source
                    src="https://res.cloudinary.com/maxigord/video/upload/v1745076438/Mailfly/Robot.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="hero-image-wrapper hero-image-7"
                   style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}
                       className="hero-video-7">
                  <source
                    src="https://res.cloudinary.com/maxigord/video/upload/v1745076399/Mailfly/Biceps.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
            <img
              height="100px" width="100px"
              className="rrr-image"
              src="https://res.cloudinary.com/maxigord/image/upload/v1745244265/Mailfly/rrr-phrase_a4dcrl.svg"
              alt="rrr-image"
              style={{ opacity: 1, willChange: 'auto', transform: "rotate(24deg)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
