import { Typography, Flex } from 'antd';
import './styles.css';

const { Text } = Typography;

export const Message = ({ text, source, avatar, timestamp }) => {
  const formattedTime = timestamp ? new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }) : '';
  
  return (
    <Flex
      className={`message-wrapper ${source === 'user' ? 'message-left' : 'message-right'}`}
      gap={4}>
      <div className="avatar-container">{avatar}</div>
      <Text className="message-text">{text}
        <Text type="secondary" className="message-time">{formattedTime}</Text>
      </Text>
    </Flex>
  );
};
