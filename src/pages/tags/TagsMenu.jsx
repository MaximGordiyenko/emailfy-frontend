import { UploadOutlineIcon } from '../../components/icons/UploadOutlineIcon';
import { CopyOutlineIcon } from '../../components/icons/CopyOutlineIcon';
import { Badge, Card, Space, Avatar } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const TagMenu = ({ handleNav, handleNavManualAdd }) => {
  return (
    <Space size="small" rootClassName="campaign-dropdown-menu-container">
      <Card size="small" onClick={handleNav}>
        <Meta
          avatar={<Avatar src={<UploadOutlineIcon />} />}
          title="Upload file"
          description="Import contacts from a CSV or tab-delimited TXT file."
        />
      </Card>
      <Card size="small" onClick={handleNavManualAdd}>
        <Meta
          avatar={<Avatar src={<CopyOutlineIcon />} />}
          title="Add manually"
          description="Directly pate in new contacts from a speedheet or similar list."
        />
      </Card>
      <Badge.Ribbon text="Coming soon" color="red">
        <Card size="small">
          <Meta
            avatar={<Avatar src={<ImportOutlined />} />}
            title="Import"
            description="Sync your contacts lists with Mailchimp, Shopify, Ortto, etc."
          />
        </Card>
      </Badge.Ribbon>
    </Space>
  );
};
