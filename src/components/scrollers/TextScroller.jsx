import { useSpring, animated } from 'react-spring';
import './styles.css';

const TextScroller = ({ text, onClick }) => {
  const scrolling = useSpring({
    from: { transform: 'translate(0%, 0)' },
    to: { transform: 'translate(-100%, 0)' },
    config: { duration: 30000 },
    loop: true,
  });

  return (
    <div onClick={onClick} className="text-scroller-container">
      <animated.div
        style={{
          ...scrolling,
          display: 'inline-block',
        }}>
        {text}&nbsp;{text}
      </animated.div>
    </div>
  );
};

export default TextScroller;
