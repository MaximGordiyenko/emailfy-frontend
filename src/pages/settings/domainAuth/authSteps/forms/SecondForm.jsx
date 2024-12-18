import { List, Divider, Card, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
const { Title, Text, Link } = Typography;

const data = [
  'Log into your domain provider website.',
  'Select the domain you want to authenticate to access the Domain Settings page.',
  'Select Manage DNS.',
  'Awesome, you’re ready for the next step!',
];

export const SecondForm = () => {
  return (
    <Card>
      <Text>
        Open a new tab or window and navigate to the your domain provider website. Then follow these
        steps to get to your domains area.
      </Text>
      <Divider />
      <List
        bordered={false}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Text type="secondary">&#x2022;</Text> {item}
          </List.Item>
        )}
      />
    </Card>
  );
};
