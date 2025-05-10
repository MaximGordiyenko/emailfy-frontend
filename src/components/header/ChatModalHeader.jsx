import { Space, Tooltip, Flex, Typography } from 'antd';
import { CloseOutlined, ShrinkOutlined } from '@ant-design/icons';
import './styles.css';

const { Title } = Typography;

export const ChatModalHeader = ({ handleCloseSession, isSessionActive, toggleModal }) => {
  return (
    <Flex justify="space-between" align="center" style={{ width: '100%' }}>
      <Title level={4} type="secondary" className="chat-head-title">Ask Support Guy</Title>
      <Space size="small">
        {isSessionActive && (
          <Tooltip title="Terminate Session">
          <div className="icon-wrapper terminate-icon">
            <CloseOutlined
              onClick={handleCloseSession}
              className="header-icon"
            />
          </div>
        </Tooltip>
        )}
        <Tooltip title="Close Modal">
          <div className="icon-wrapper close-icon">
            <ShrinkOutlined
              onClick={toggleModal}
              className="header-icon"
            />
          </div>
        </Tooltip>
      </Space>
    </Flex>
  );
};
