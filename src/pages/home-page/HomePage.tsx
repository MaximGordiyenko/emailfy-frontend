import { FC } from 'react';
import { Typography, Flex } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAccountStatus, getAudienceStatus } from '../../api/dashboard/dashboard.js';
import { SurveyStepper } from '../../components/stepper/SurveyStepper.tsx';
import '../../components/stepper/styles.css';
// import { AppTimeLines } from '../../components/timelines/AppTimeLines.tsx';

const {Text, Title} = Typography;

export const HomePage: FC = () => {
  
  const {
    data: accountStatusData,
    isLoading: accountStatusLoading
  } = useQuery({
    queryKey: [ 'getAccountStatus' ],
    queryFn: getAccountStatus,
    retry: 1,
    refetchOnWindowFocus: false
  });
  
  // const {data: audienceStatusData, isLoading: audienceStatusLoading} = useQuery({
  //   queryKey: [ 'getAudienceStatus' ],
  //   queryFn: getAudienceStatus,
  //   retry: 1,
  //   refetchOnWindowFocus: false
  // });
  
  return (
    <>
      <Flex gap="small" align="center" justify="center" vertical>
        <Title>Welcome to <Text>Emailfy</Text> Wizard</Title>
        <Text type="secondary">
          Lets try out the full functionality of Emailfy so that you and your customers get the best
          possible experience with us
        </Text>
      </Flex>
      
      <SurveyStepper/>
      
      {/*<AppTimeLines accountStatusData={accountStatusData}/>*/}
    </>
  );
};
