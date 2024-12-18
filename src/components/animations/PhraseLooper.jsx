import { useState, useEffect } from 'react';
import { Typography, Flex } from 'antd';
import logo from '../../assets/images/dinoLogo.png';
import './styles.css';

const { Text } = Typography;

const PhraseLooper = ({ themeBgColor }) => {
  const phrases = ['Banner', 'Promo', 'Ads'];
  const defaultPhrase = 'EmailFly';
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [index, setIndex] = useState(1);
  const [animationClass, setAnimationClass] = useState('fade-in-bottom');

  // Function to return a background color based on the phrase
  const getBackgroundColor = (phrase) => {
    switch (phrase) {
      case phrases[0]:
        return 'lightblue';
      case phrases[1]:
        return 'lightgreen';
      case phrases[2]:
        return 'lightcoral';
      default:
        return 'transparent';
    }
  };

  // Function to return underline color based on the current phrase
  const getUnderlineColor = (phrase) => {
    switch (phrase) {
      case phrases[0]:
        return 'lightblue';
      case phrases[1]:
        return 'lightgreen';
      case phrases[2]:
        return 'lightcoral';
      default:
        return 'transparent';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass('fade-out-top'); // Trigger fade-out-top animation

      setTimeout(() => {
        setCurrentPhrase(phrases[index]);
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setAnimationClass('fade-in-bottom'); // Trigger fade-in-bottom animation
      }, 500); // Match the animation duration
    }, 2500); // Total cycle: 2 seconds visible + 0.5 second transition

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [index, phrases]);

  return (
    <Flex
      align="center"
      gap={5}
      justify="space-between"
      vertical
      style={{
        backgroundColor: themeBgColor,
      }}
      rootClassName="phrase-container gradient-border">
      <Text
        className={`phrase ${animationClass}`}
        style={{
          backgroundColor: getBackgroundColor(currentPhrase),
        }}>
        {currentPhrase}
      </Text>
      <Flex align="center" gap={0} justify="space-between">
        <img width={20} height={20} alt="logo" src={logo} />
        <Text
          className="default-phrase"
          style={{
            textDecoration: `underline solid 4px ${getUnderlineColor(currentPhrase)}`, // Fat underline with dynamic color
          }}>
          {defaultPhrase}
        </Text>
      </Flex>
    </Flex>
  );
};

export default PhraseLooper;
