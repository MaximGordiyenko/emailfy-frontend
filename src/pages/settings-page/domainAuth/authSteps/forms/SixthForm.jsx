import React, { useState } from 'react';
import { CheckStatus } from './CheckStatus';
import { Divider, Button, List, Card, Typography } from 'antd';
const { Title, Text, Link } = Typography;

const data = [
  ` It can take emailfy some time to validate that the records were created correctly, so
          close this window and go enjoy a cup of coffee. (Though it could take up to 48 hours.
          Maybe brew a pot.)`,
  `We'll send you an email to let you know if everything is good or if we couldn&apos;t
          validate your records. Don&apos;t worry, we&apos;ll take you through how to fix any
          errors. And you can keep sending emails though Emailfy while you wait.`,
];

export const SixthForm = () => {
  const [checking, setChecking] = useState(false);

  const handleCheckStatus = () => {
    setChecking(true);
  };

  if (checking) {
    return <CheckStatus />;
  }

  return (
    <Card>
      <Text>Wait for emailfy to check the records.</Text>
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
      <Button className="next-button" onClick={handleCheckStatus}>
        Check status
      </Button>
    </Card>
  );
};
