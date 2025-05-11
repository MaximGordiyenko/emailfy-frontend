import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';

import { Layout, theme, FloatButton, Modal } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

import { getToken } from '../api/API.js';
import { fetchMessages, sendMessageApi } from '../api/chats/chat.js';

import { modalBodyCss } from './layout.constants.js';
import { MainProvider } from '../context/MainContext';

import { Head } from '../components/header/Header';
import { Sidebar } from '../components/sidebar/Sidebar';
import { AppFooter } from '../components/footer/AppFooter';
import { ChatModalHeader } from '../components/header/ChatModalHeader.jsx';
import { Chat } from '../components/chats/Chat.jsx';
import { ChatForm } from '../components/chats/ChatForm.jsx';

import './styles.css';

const { Content } = Layout;

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(() => sessionStorage.getItem('sessionId') || '');
  const [isSessionActive, setIsSessionActive] = useState(!!sessionId);
  const intervalRef = useRef(null);
  const pollCountRef = useRef(0);
  
  const { pathname } = useLocation();
  
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      message: ''
    }
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
  
  const accessToken = getToken('refreshToken');
  const { id: accountId } = accessToken ? jwtDecode(accessToken) : { id: null };
  
  const toggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };
  
  const loadMessages = async () => {
    try {
      const data = await fetchMessages({ sessionId });
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };
  
  const startPolling = () => {
    stopPolling();
    pollCountRef.current = 0;
    intervalRef.current = setInterval(async () => {
      if (pollCountRef.current >= 10) {
        console.log('Polling paused after 10 cycles.');
        stopPolling();
        return;
      }
      await loadMessages();
      pollCountRef.current += 1;
    }, 2000);
  };
  
  
  const stopPolling = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  
  const onSubmit = async ({ message }) => {
    if (!message.trim()) return;
    try {
      await sendMessageApi({ accountId, sessionId, message });
      await loadMessages();
      pollCountRef.current = 0;
      if (!intervalRef.current) startPolling();
      reset();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };
  
  const handleNewSession = () => {
    const newSessionId = uuidv4();
    sessionStorage.setItem('sessionId', newSessionId);
    setSessionId(newSessionId);
    setMessages([]);
    setIsSessionActive(true);
    startPolling();
  };
  
  const handleCloseSession = () => {
    stopPolling();
    sessionStorage.removeItem('sessionId');
    setSessionId('');
    setMessages([]);
    setIsSessionActive(false);
  };
  
  useEffect(() => {
    if (isSessionActive && sessionId) {
      loadMessages();
      startPolling();
    }
    return () => stopPolling();
  }, [sessionId]);
  
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
              title={
                <ChatModalHeader
                  handleCloseSession={handleCloseSession}
                  isSessionActive={isSessionActive}
                  toggleModal={toggleModal}
                />
              }
              footer={
                <ChatForm
                  control={control}
                  errors={errors}
                  reset={reset}
                  handleSubmit={handleSubmit}
                  onKeyDown={(e) => e.key === 'Enter' && onSubmit}
                  disabled={!isSessionActive}
                  onSubmit={onSubmit}
                />
              }
              mask={true}
              closable={false}
              open={isOpenModal}
              onCancel={toggleModal}
              className="chat-modal"
              styles={{ body: modalBodyCss }}
              width={800}
              centered>
              <Chat
                messages={messages}
                handleNewSession={handleNewSession}
                isSessionActive={isSessionActive}
              />
            </Modal>
            
            <FloatButton.Group shape="circle" style={{ insetInlineEnd: 20 }}>
              <FloatButton
                tooltip={<div>Click to ask of support</div>}
                badge={{ count: messages.length, color: 'blue' }}
                icon={<CommentOutlined/>}
                onClick={toggleModal}
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
