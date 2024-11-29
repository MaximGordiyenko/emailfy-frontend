import empty from '../../assets/images/emptyState.svg';
import { Typography, Button, Empty } from 'antd';
import './styles.css';

export const EmptyPlaceholder = () => {
  return (
    <Empty
      image={empty}
      imageStyle={{ height: 200 }}
      description={
        <Typography.Text>
          There is nothing here yet. You will find all your campaign statistics here, and for now,
          you can create your first campaign by clicking the button below.
        </Typography.Text>
      }>
      <Button type="primary">Create Now</Button>
    </Empty>
  );
};
