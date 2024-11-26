import './styles.css';
import { Typography } from 'antd';
const { Link } = Typography;

export const SubscriptionPage = () => {
  return (
    <div className="subscription-page-container">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aut, dicta ea eaque eos
      est exercitationem expedita laboriosam mollitia nemo numquam perferendis recusandae repellat
      sit suscipit tempore ut veniam.
      <Link href="https://ant.design" target="_blank">
        Ant Design (Link)
      </Link>
    </div>
  );
};
