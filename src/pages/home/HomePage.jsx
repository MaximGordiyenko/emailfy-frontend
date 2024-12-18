import { Timeline, Typography, Button, Flex, Space } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getAccountStatus, getAudienceStatus } from '../../api/dashboard/dashboard';
import './styles.css';

const { Text, Title } = Typography;

export const HomePage = () => {
  const { data: accountStatusData, isLoading: accountStatusLoading } = useQuery({
    queryKey: ['getAccountStatus'],
    queryFn: getAccountStatus,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {},
  });

  const { data: audienceStatusData, isLoading: audienceStatusLoading } = useQuery({
    queryKey: ['getAudienceStatus'],
    queryFn: getAudienceStatus,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {},
  });

  console.log(accountStatusData);
  return (
    <>
      <Flex gap="small" align="center" justify="center" vertical>
        <Title>Welcome to Emailfy!</Title>
        <Text>
          lets try out the full functionality of Emailfy so that you and your customers get the best
          possible experience with us
        </Text>
      </Flex>
      <Timeline
        mode="alternate"
        items={[
          {
            color: !!accountStatusData ? '#7E9D00' : 'red',
            dot: !!accountStatusData ? (
              <CheckCircleOutlined />
            ) : (
              <ClockCircleOutlined style={{ fontSize: '16px' }} />
            ),
            children: (
              <>
                <Title level={4}>Create and fill your account</Title>
                <Text>
                  First of all, you need to create an account and fill out all the necessary profile
                  information
                </Text>
              </>
            ),
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
            ),
          },
          {
            dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
            children: (
              <>
                <Title level={4}>Create your first tag</Title>
                <Text>
                  Tags complement your audience and help sort your contacts more accurately
                </Text>
                <Button>Create first tag</Button>
              </>
            ),
          },
          {
            color: 'red',
            dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
            children: (
              <>
                <Title level={4}>Create your first campaign</Title>
                <Text>
                  Tags complement your audience and help sort your contacts more accurately
                </Text>
                <Button>Create first campaign</Button>
              </>
            ),
          },
        ]}
      />
    </>
  );
};
