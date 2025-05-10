import { useEffect, useRef } from 'react';
import { Flex, Empty, Typography } from 'antd';
import { UserOutlined, CustomerServiceOutlined, MessageOutlined } from '@ant-design/icons';
import { Message } from './Message.jsx';
import './styles.css';
import { AppButton } from '../button/AppButton.jsx';

const { Text } = Typography;

export const Chat = ({ messages, isSessionActive, handleNewSession }) => {
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  return (
    <Flex vertical gap={10} className="messages-container">
      {isSessionActive ? (
        <>
          {messages.map((message, index) => (
            <Message
              key={message.id || index}
              text={message.message}
              source={message.fromRole}
              timestamp={message.createdAt}
              avatar={message.fromRole === 'user' ? <UserOutlined /> : <CustomerServiceOutlined />}
            />
          ))}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <Empty
          image={<MessageOutlined style={{ fontSize: 70, color: '#98B133D5' }} />}
          description={
          <Flex vertical gap={20}>
            <Text style={{ fontSize: 16 }}>
              Oh, No messages yet. Start a conversation!
            </Text>
            <AppButton
              // icon={<SendOutlined/>}
              onClick={handleNewSession}
              role="submit"
              size="middle">
              Start New Chat
            </AppButton>
          </Flex>
          }
        />
      )}
    </Flex>
  );
};
