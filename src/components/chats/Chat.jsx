import { Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Message } from './Message.jsx';
import './styles.css';

export const Chat = ({ messages }) => {
  return (
    <Flex vertical={true} gap={10} className="message-container">
      {messages.map((message, index) => (
        <Message key={index} text={message.text} source={message.source} avatar={<UserOutlined/>}/>
      ))}
    </Flex>
  );
};
