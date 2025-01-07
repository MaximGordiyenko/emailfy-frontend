import { format } from 'date-fns';

import { Card, Flex, Rate } from 'antd';
import {
  EditOutlined,
  PieChartOutlined,
  ContactsOutlined,
  DeleteOutlined,
  HeartOutlined,
} from '@ant-design/icons';

import './styles.css';

const { Meta } = Card;

export const AudienceListCard = ({ data, loading }) => {
  return (
    <Flex wrap gap="middle" rootClassName="audience-list-card-container">
      {data &&
        data?.map((el) => (
          <Card
            key={el.id}
            loading={loading}
            actions={[
              <DeleteOutlined key="delete" className="delete-icon" />,
              <EditOutlined key="edit" />,
              <Rate
                allowClear
                value={true}
                count={1}
                onChange={(val) => !val}
                character={<HeartOutlined />}
                key="Favorite"
              />,
            ]}>
            <Meta
              title={el.name}
              description={
                <Flex gap="small" vertical="vertical">
                  <Flex gap="large">
                    <ContactsOutlined style={{ color: '#7E9D00' }} /> <strong>{el.contacts}</strong>
                    <PieChartOutlined style={{ color: '#7E9D00' }} /> <strong>{el.segments}</strong>
                  </Flex>
                  <Flex gap={2} vertical="vertical">
                    <span>
                      Created: <strong>{format(new Date(el.created), 'MMM d, yyyy')}</strong>
                    </span>
                    <span>
                      Edited: <strong>{format(new Date(el.modified), 'MMM d, yyyy')}</strong>
                    </span>
                  </Flex>
                </Flex>
              }
            />
          </Card>
        ))}
    </Flex>
  );
};
