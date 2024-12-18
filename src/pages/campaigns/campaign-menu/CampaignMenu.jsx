import { EnvelopOutlineIcon } from '../../../components/icons/EnvelopOutlineIcon';
import { SwitcherOutlineIcon } from '../../../components/icons/SwitcherOutlineIcon';
import { ShareCircleOutlineIcon } from '../../../components/icons/ShareCircleOutlineIcon';
import './styles.css';
import { Badge, Card, Space, Avatar } from 'antd';
const { Meta } = Card;

export const CampaignMenu = ({ onOpenModal }) => {
  return (
    <Space size="small" rootClassName="campaign-dropdown-menu-container">
      <Card size="small" onClick={onOpenModal}>
        <Meta
          avatar={<Avatar src={<EnvelopOutlineIcon />} />}
          title="Email"
          description="Upload, write, or design: create your most impactful email campaign right away."
        />
      </Card>
      <Badge.Ribbon text="Coming soon" color="red">
        <Card size="small">
          <Meta
            avatar={<Avatar src={<SwitcherOutlineIcon />} />}
            title="A/B Testing"
            description="Test various emails within a campaign to determine the most effective."
          />
        </Card>
      </Badge.Ribbon>
      <Badge.Ribbon text="Coming soon" color="red">
        <Card size="small">
          <Meta
            avatar={<Avatar src={<ShareCircleOutlineIcon />} />}
            title="Automations"
            description="Create visual customers' journeys and automate your outreach."
          />
        </Card>
      </Badge.Ribbon>
    </Space>
  );
};
