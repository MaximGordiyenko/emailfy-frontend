import { Tooltip, Divider, Typography } from 'antd';
const { Title } = Typography;

export const ChartContentWrapper = ({ children }) => {
  return (
    <>
      <Divider orientation="left">
        <Tooltip title={'bla'} placement="topLeft">
          <Title level={3} type="secondary">
            bla
          </Title>
        </Tooltip>
      </Divider>
      <div>{children}</div>
    </>
  );
};
