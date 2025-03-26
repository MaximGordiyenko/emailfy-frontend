import { useState, useEffect } from 'react';
import { MainProvider } from '../context/MainContext';

import { Layout, theme, FloatButton, Modal, Typography, Flex } from 'antd';
import { CommentOutlined, ShrinkOutlined, CloseOutlined } from '@ant-design/icons';

import { Outlet, useLocation } from 'react-router-dom';

import { Sidebar } from '../components/sidebar/Sidebar';
import { Head } from '../components/header/Header';
import { AppFooter } from '../components/footer/AppFooter';
import { Chat } from '../components/chats/Chat.jsx';
import { useForm } from 'react-hook-form';
import { ChatForm } from '../components/chats/ChatForm.jsx';

import { modalBodyCss } from './layout.constants.js';
import './styles.css';

const { Content } = Layout;
const { Title, Text } = Typography;

export const MainLayout = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  
  const { pathname } = useLocation();
  
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { chat: '' }
  });
  
  const sidebarWidth = isCollapsed ? 100 : 200;
  
  useEffect(() => {
    // Automatically collapse sidebar for "mail-builder-page"
    if (pathname.includes('mail-builder-page')) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [pathname]);
  
  // Establish WebSocket connection
  useEffect(() => {
    function connectWebSocket() {
      const ws = new WebSocket(process.env.REACT_APP_WSS_URL || "ws://localhost:4001");
      
      ws.onopen = () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
        setSocket(ws);
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'MESSAGE':
            setMessages(prev => [...prev, {
              text: data.message,
              source: data.source
            }]);
            break;
          
          case 'SESSION_CREATED':
            setCurrentSessionId(data.sessionId);
            break;
          
          case 'ERROR':
            console.error(data.message);
            break;
          
          case 'STATUS':
            console.log(data.message);
            break;
        }
      };
      
      ws.onclose = () => {
        console.log('WebSocket Disconnected');
        setIsConnected(false);
        setSocket(null);
        
        // Attempt reconnection after 3 seconds
        setTimeout(connectWebSocket, 3000);
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
    }
    
    connectWebSocket();
  }, []);
  
  // Open chat handler
  const openChat = () => {
    if (!isConnected) return;
    
    // Create new chat session
    socket.send(JSON.stringify({ type: 'CREATE_SESSION' }));
    
    // Clear previous messages
    setMessages([]);
  };
  
  // Close chat handler
  const closeChat = () => {
    if (!isConnected) return;
    
    // Close current chat session
    socket.send(JSON.stringify({ type: 'CLOSE_SESSION' }));
    
    // Set chat as closed
    setCurrentSessionId(null);
  };
  
  
  const onSubmit = async (data) => {
    const { chat } = data;
    if (!chat.trim() || !isConnected) return;
    
    // Send message to server
    socket.send(JSON.stringify({
      type: 'MESSAGE',
      message: chat
    }));
    
    // Add to local messages
    setMessages(prev => [...prev, {
      text: chat,
      source: 'website'
    }]);
    
    // Clear input
    reset({ chat: '' });
  };
  
  return (
    <MainProvider>
      <Layout rootClassName="main-layout">
        
        <Sidebar
          sidebarWidth={sidebarWidth}
          onCollapse={setIsCollapsed}
          isCollapse={isCollapsed}
          themeBgColor={colorBgContainer}
        />
        
        <Layout>
          <Head isCollapsed={isCollapsed}/>
          
          <Content
            style={{
              margin: `24px 20px 24px ${sidebarWidth}px`,
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}>
            <Outlet/>
            
            <Modal
              title="Ask Support Guy"
              footer={
                <ChatForm
                  control={control} errors={errors} isConnected={isConnected}
                  handleSubmit={handleSubmit} onSubmit={onSubmit}
                />
              }
              destroyOnClose={true}
              mask={true}
              closable={{ closeIcon: <CloseOutlined onClick={closeChat}/> }}
              open={isOpenModal}
              onCancel={() => setIsOpenModal((prev) => !prev)}
              className="chat-modal"
              styles={{ body: modalBodyCss }}
              width={800}
              centered>
              <Chat isConnected={isConnected} messages={messages}/>
            </Modal>
            
            <FloatButton.Group shape="circle" style={{ insetInlineEnd: 20 }}>
              <FloatButton
                tooltip={<div>Click to ask of support</div>}
                badge={{ count: 5, color: 'blue' }}
                icon={<CommentOutlined/>}
                onClick={() => {
                  setIsOpenModal((prev) => !prev);
                  openChat();
                }}
              />
              <FloatButton.BackTop visibilityHeight={0}/>
            </FloatButton.Group>
          </Content>
          
          <AppFooter sidebarWidth={sidebarWidth}/>
        
        </Layout>
      </Layout>
    </MainProvider>
  );
};
