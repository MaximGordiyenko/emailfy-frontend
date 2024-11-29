import { Col, Row, Statistic, Skeleton, Typography, Divider, Tooltip } from 'antd';
const { Title } = Typography;

export const StatisticsCards = ({ data, loading, title, tooltipText }) => {
  return (
    <>
      <Divider orientation="left">
        <Tooltip title={tooltipText} placement="topLeft">
          <Title level={3} type="secondary">
            {title}
          </Title>
        </Tooltip>
      </Divider>
      <Row gutter={[8, 16]}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Col span={4} key={index}>
                <Skeleton active loading={loading} paragraph={{ rows: 1 }} />
              </Col>
            ))
          : data?.map((item) => (
              <Col span={4} key={item.id}>
                <Statistic title={item.metric} value={item.value} />
              </Col>
            ))}
      </Row>
    </>
  );
};
