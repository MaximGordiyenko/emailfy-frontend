import { useEffect, useState } from 'react';
import StepRangeSlider from 'react-step-range-slider';
import { motion } from 'framer-motion';
import './styles.css';

const range = [
  { value: 0, step: 10 }, // acts as min value
  { value: 100, step: 100 },
  { value: 1000, step: 1000 },
  { value: 10000, step: 10000 },
  { value: 100000, step: 100000 },
  { value: 1000000, step: 1000000 }, // acts as max value
];

export const SectionSix = () => {
  const [value, setValue] = useState(100000);
  const [trackSize, setTrackSize] = useState('0%');
  
  const onChange = (value) => {
    setValue(value);
  };
  
  useEffect(() => {
    setTrackSize(document.querySelector('.StepRangeSlider__handle').style.left);
  }, [value]);
  
  return (
    <div className="section">
      <div className="section-four-row">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeIn' } }}
          viewport={{ amount: 0.3, once: true }}
          className="calculator-column">
          <div className="calculator-content">
            <div className="calculator-content-header">
              <h2 className="calculator-content-header-title">
                The real <br />
                pay-as-you-go
              </h2>
              <span className="calculator-content-header-text">
                You don&apos;t have to pay in advance or for the number of contacts you store. Only
                pay for the emails <br className="br" />
                you actually send!
              </span>
            </div>
            <div className="calculator-content-footer">
              <span className="calculator-content-footer-title">
                Starting At <span className="green-text">$0.0001 Per Email*</span>
              </span>
              <span className="calculator-content-footer-text">
                *less than 100Kb and sent when server load is low
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, delay: 0.2, ease: 'easeIn' },
          }}
          viewport={{ amount: 0.3, once: true }}
          className="calculator-column">
          <div className="calculator-slider-container">
            <span className="calculator-slider-heading">
              Calculate your <br />
              expenses per campaign
            </span>
            <div className="calculator-slider-wrapper">
              <div className="calculator-slider-content">
                <div className="calculator-slider-info">
                  <span className="calculator-slider-value">{value} emails</span>
                  <span className="calculator-slider-label">Drag the slider to adjust</span>
                </div>
                <div className="calculator-slider-price">
                  <h2 className="green-text">~${(value * 0.0001).toFixed(2)}</h2>
                </div>
              </div>
              <div className="calculator-slider">
                <StepRangeSlider
                  className="calculator-slider-input"
                  value={value}
                  range={range}
                  onChange={onChange}
                />
                <div className="active-track" style={{ width: trackSize }} />
                <div className="calculator-slider-ruler">
                  <span>0</span>
                  <span>100</span>
                  <span>1K</span>
                  <span>10K</span>
                  <span>100K</span>
                  <span>1M</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
