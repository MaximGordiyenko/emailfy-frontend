import { Typography, Avatar, Flex, Tag } from 'antd';
import './styles.css';

const { Text } = Typography;

export const Message = ({ text, source, avatar }) => {
  const className = source === 'website' ? 'message-left' : 'message-right';
  
  return (
    <Flex vertical={true} className={`message ${className}`}>
      <Flex align="center" className="profile-container">
        <Avatar src={avatar} style={{ color: source === 'website' ? 'green' : 'lime' }}/>
        <Text>User name</Text>
      </Flex>
      <Tag
        color={source === 'website' ? 'green' : 'lime'}
        style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'normal' }}>
        {text}
      </Tag>
    </Flex>
  );
};
