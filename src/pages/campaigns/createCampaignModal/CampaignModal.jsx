import { useNavigate } from 'react-router-dom';

import { MODAL_CARDS } from '../campaigns.constants';
import { Flex, Card, Modal, Typography } from 'antd';
import './styles.css';
const { Meta } = Card;
const { Title } = Typography;

export const CampaignModal = ({ hoveredCard, setHoveredCard, open, onCancel, setIsOpenMenu }) => {
  const navigate = useNavigate();

  return (
    <Modal
      title={<Title level={4}>Create Email Campaign</Title>}
      footer={null}
      mask={true}
      maskClosable={true}
      centered
      open={open}
      onCancel={onCancel}
      width={800}>
      <Flex justify="center" align="center" gap={40}>
        {MODAL_CARDS.map((card) => (
          <Card
            key={card.id}
            hoverable
            style={{
              background: hoveredCard === card.id ? card.hover : card.background,
              border: hoveredCard === card.id ? `1px solid ${card.borderHover}` : 'none',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => {
              // localStorage.removeItem('current_template_id');
              card.path && navigate(card.path);
              onCancel();
              setIsOpenMenu();
            }}
            cover={
              <img
                alt="example"
                src={card.img}
                style={{ padding: '30px 8px 0px 8px', width: '70%', margin: '0 auto' }}
              />
            }>
            <Meta title={card.title} style={{ textAlign: 'center' }} />
          </Card>
        ))}
      </Flex>
    </Modal>
  );
};
