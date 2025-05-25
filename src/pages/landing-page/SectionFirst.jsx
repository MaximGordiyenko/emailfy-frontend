import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-spring';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { ClockCircleOutlined, LoginOutlined } from '@ant-design/icons';
import { AppButton } from '../../components/button/AppButton.jsx';
import { ROUTE } from '../../routes/routes.constants.js';
import './styles.css';
import { BrandLogo } from '../../components/logo/BrandLogo.jsx';

export const SectionFirst = () => {
  const navigate = useNavigate();
  
  const el = useRef(null);
  
  const [ref, inView] = useInView({
    threshold: 0.5, // Trigger when element is 50% visible
    triggerOnce: true // Only trigger once
  });
  
  const heroImageItemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom) => {
      return {
        y: 0,
        opacity: 1,
        transition: { duration: 1.5 - 0.13 * custom, ease: 'easeOut', delay: custom * 0.13 },
      };
    },
  };
  
const helloText = [
    'Hello',
    'Kumusta',
    '你好',
    'Hola',
    'Привіт',
    'Hallo',
    'नमस्ते',
    'Bonjour',
  ];
  
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: helloText,
      typeSpeed: 80,
      backSpeed: 50,
      startDelay: 2000,
      loop: true,
      showCursor: false,
    });
    return () => {
      typed.destroy();
    };
  }, []);
  
  return (
    <div className="section first-container">
      <div className="first-row">
        <div className="hero-column">
          <div className="hero-content">
            <BrandLogo />
            <div className="hero-slogan-container">
              <div className="hero-slogan-title" ref={ref}>
                <span className={`fill-text ${inView ? 'fill-visible' : ''}`}>Email.</span>
                <span className={`fill-text ${inView ? 'fill-visible' : ''}`}>Marketing.</span>
                <span className={`fill-text ${inView ? 'fill-visible' : ''}`}>Platform.</span>
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
                icon={<ClockCircleOutlined />}
              />
              <AppButton
                label={'Login to try Beta'}
                role="submit"
                iconPosition="start"
                onClick={() => navigate(`/${ROUTE.login}`)}
                icon={<LoginOutlined/>}
              />
            </div>
          </div>
        </div>
        <div className="hero-column">
          <div className="hero-images-container">
            <div className="hero-images-row">
              <motion.div
                initial="hidden"
                animate={'visible'}
                custom={0}
                variants={heroImageItemAnimation}
                className="hero-image-wrapper hero-image-1">
                <span ref={el} />
                <span className="hero-image-cursor">|</span>
              </motion.div>
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
            </div>
            <div className="hero-images-row">
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
            <div className="hero-images-row">
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
