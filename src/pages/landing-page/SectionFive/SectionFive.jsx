import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScreenSize } from '../../../hooks/useScreenSize.js';
import Switch from '../../../components/switchers/Switch.jsx';
import Heading from '../../../components/header/Heading.jsx';
import './styles.css';

const offsetY = [0, 1];

export const SectionFive = () => {
  const { width } = useScreenSize();
  
  const getOffset = (desktop, mobile) => {
    if (width < 576) return mobile;
    return desktop;
  };
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: getOffset(['-100vh', '0'], ['-1000px', 'start'])
  });
  
  const labelGreenX = getOffset([2000, 0], [-102, -103]);
  const labelGreenY = getOffset([250, 66], [109, 110]);
  const labelGreenR = getOffset([7.59, -13.59], [-11.5, -11.54]);
  
  const labelOrangeX = getOffset([2000, 0], [91, 90]);
  const labelOrangeY = getOffset([250, 0], [-8, -9]);
  const labelOrangeR = getOffset([-100.69, 6.69], [1.43, 1.44]);
  
  const labelYellowX = getOffset([2500, 0], [-94, -95]);
  const labelYellowY = getOffset([380, 197], [80, 79]);
  const labelYellowR = getOffset([-12.67, 12.67], [13.14, 13.15]);
  
  const labelBlueX = getOffset([2500, 0], [-30, -31]);
  const labelBlueY = getOffset([400, 57], [61, 60]);
  const labelBlueR = getOffset([-100.31, 18.31], [15.57, 15.58]);
  
  const labelPurpleX = getOffset([2050, 0], [-7, -8]);
  const labelPurpleY = getOffset([900, 3], [7, 6]);
  const labelPurpleR = getOffset([-200.93, -6.93], [-11.93, -11.94]);
  
  const labelGreenTop = useTransform(scrollYProgress, offsetY, labelGreenY);
  const labelGreenLeft = useTransform(scrollYProgress, offsetY, labelGreenX);
  const labelGreenRotate = useTransform(scrollYProgress, offsetY, labelGreenR);
  
  const labelOrangeTop = useTransform(scrollYProgress, offsetY, labelOrangeY);
  const labelOrangeRight = useTransform(scrollYProgress, offsetY, labelOrangeX);
  const labelOrangeRotate = useTransform(scrollYProgress, offsetY, labelOrangeR);
  
  const labelYellowTop = useTransform(scrollYProgress, offsetY, labelYellowY);
  const labelYellowRight = useTransform(scrollYProgress, offsetY, labelYellowX);
  const labelYellowRotate = useTransform(scrollYProgress, offsetY, labelYellowR);
  
  const labelBlueBottom = useTransform(scrollYProgress, offsetY, labelBlueY);
  const labelBlueLeft = useTransform(scrollYProgress, offsetY, labelBlueX);
  const labelBlueRotate = useTransform(scrollYProgress, offsetY, labelBlueR);
  
  const labelPurpleBottom = useTransform(scrollYProgress, offsetY, labelPurpleY);
  const labelPurpleRight = useTransform(scrollYProgress, offsetY, labelPurpleX);
  const labelPurpleRotate = useTransform(scrollYProgress, offsetY, labelPurpleR);
  
  const labelOpacity = useTransform(scrollYProgress, offsetY, getOffset([0.5, 1], [0.9, 1]));
  
  const contentScale = useTransform(scrollYProgress, offsetY, getOffset([0.5, 1], [0.9, 1]));
  
  const contentStyle = {
    scale: contentScale
  };
  
  const labelGreen = {
    top: labelGreenTop,
    left: labelGreenLeft,
    rotate: labelGreenRotate,
    opacity: labelOpacity
  };
  const labelOrange = {
    top: labelOrangeTop,
    right: labelOrangeRight,
    rotate: labelOrangeRotate,
    opacity: labelOpacity
  };
  const labelYellow = {
    top: labelYellowTop,
    right: labelYellowRight,
    rotate: labelYellowRotate,
    opacity: labelOpacity
  };
  const labelBlue = {
    bottom: labelBlueBottom,
    left: labelBlueLeft,
    rotate: labelBlueRotate,
    opacity: labelOpacity
  };
  const labelPurple = {
    bottom: labelPurpleBottom,
    right: labelPurpleRight,
    rotate: labelPurpleRotate,
    opacity: labelOpacity
  };
  
  return (
    <div className="section section-five">
      <div ref={ref} className="section-five-row">
        <motion.div className="section-five-column" style={contentStyle}>
          <div className="section-five-content">
            <div className="section-five-breadcrumbs">
              {
                width > 576 && <img
                  src={`https://res.cloudinary.com/maxigord/image/upload/v1745416542/Mailfly/dollar-minimalistic_tfnunw.svg`}
                  alt="dollarIcon"/>
              }
              <div className="section-five-breadcrumbs-items">
                <span>{width > 576 ? 'Billing' : '...'}</span>
                <span>/</span>
                <span>My Bundle</span>
                <span>/</span>
                <span className="green-text">Add feature(s)</span>
              </div>
            </div>
            <Heading>
              Customize your experience and savings!{width < 576 ? <br/> : ' '}
              <span className="green-text">Pay per feature.</span>
            </Heading>
            <span className="section-five-description">
              Core tools are always <span className="green-text">free</span>, a wide range of extensions {width > 576 && <br/>}
              available for you to select from...
            </span>
          </div>
        </motion.div>
        <motion.div style={labelGreen} className="section-five-label section-five-label-green">
          <img className="section-five-label-icon"
               src={`https://res.cloudinary.com/maxigord/image/upload/v1745416754/Mailfly/widget-5_kt9tiq.svg`}
               alt="widgetIcon"/>
          <span className="section-five-label-text">Extended Dashboard</span>
          <Switch enabled={true}/>
        </motion.div>
        <motion.div style={labelOrange} className="section-five-label section-five-label-orange">
          <img className="section-five-label-icon"
               src={`https://res.cloudinary.com/maxigord/image/upload/v1745416829/Mailfly/calendar-mark_jlbwwn.svg`}
               alt="calendarMarkIcon"/>
          <span className="section-five-label-text">Email Scheduling</span>
          <Switch enabled={false}/>
        </motion.div>
        <motion.div style={labelYellow} className="section-five-label section-five-label-yellow">
          <img className="section-five-label-icon"
               src={`https://res.cloudinary.com/maxigord/image/upload/v1745416932/Mailfly/bolt_bohozv.svg`}
               alt="boltIcon"/>
          <span className="section-five-label-text">Dynamic Content</span>
          <Switch enabled={true}/>
        </motion.div>
        <motion.div style={labelBlue} className="section-five-label section-five-label-blue">
          <img className="section-five-label-icon"
               src={`https://res.cloudinary.com/maxigord/image/upload/v1745417563/Mailfly/chat_gpdoqr.svg`}
               alt="routingIcon"/>
          <span className="section-five-label-text">Automations</span>
          <Switch enabled={false}/>
        </motion.div>
        <motion.div style={labelPurple} className="section-five-label section-five-label-purple">
          <img className="section-five-label-icon"
               src={`https://res.cloudinary.com/maxigord/image/upload/v1745417563/Mailfly/chat_gpdoqr.svg`}
               alt="chatSquareCallIcon"/>
          <span className="section-five-label-text">AI Assistant</span>
          <Switch enabled={true}/>
        </motion.div>
      </div>
    </div>
  );
};
