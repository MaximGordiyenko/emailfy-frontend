import { FC } from 'react';
import { Button, Space, Timeline, Typography } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { TimeLinesProps } from './types';

const {Text, Title} = Typography;

export const AppTimeLines: FC<TimeLinesProps> = ({ accountStatusData }) => {
  return (
    <Timeline
      mode="alternate"
      items={[
        {
          color: !!accountStatusData ? '#7E9D00' : 'red',
          dot: !!accountStatusData ? (
            <CheckCircleOutlined/>
          ) : (
            <ClockCircleOutlined style={{fontSize: '16px'}}/>
          ),
          children: (
            <>
              <Title level={4}>Create and fill your account</Title>
              <Text>
                First of all, you need to create an account and fill out all the necessary profile
                information
              </Text>
            </>
          )
        },
        {
          children: (
            <>
              <Title level={4}>Add your first audience</Title>
              <Text>
                Audiences combine users of the same type into a common category, where they will
                be easier and more convenient to manage
              </Text>
              <Space.Compact block>
                <Button>Create first audience</Button>
              </Space.Compact>
            </>
          )
        },
        {
          dot: <ClockCircleOutlined style={{fontSize: '16px'}}/>,
          children: (
            <>
              <Title level={4}>Create your first tag</Title>
              <Text>
                Tags complement your audience and help sort your contacts more accurately
              </Text>
              <Button>Create first tag</Button>
            </>
          )
        },
        {
          color: 'red',
          dot: <ClockCircleOutlined style={{fontSize: '16px'}}/>,
          children: (
            <>
              <Title level={4}>Create your first campaign</Title>
              <Text>
                Tags complement your audience and help sort your contacts more accurately
              </Text>
              <Button>Create first campaign</Button>
            </>
          )
        }
      ]}
    />
  )
};
