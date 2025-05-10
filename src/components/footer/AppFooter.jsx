import { useLocation } from 'react-router-dom';
import { Layout, Typography, Flex, Divider } from 'antd';
import { imageMap } from './constants.js';
import './styles.css';

const { Footer } = Layout;
const { Link, Title } = Typography;

export const AppFooter = ({ sidebarWidth }) => {
  
  const location = useLocation();
  const pathname = location.pathname;
  
  // Match first route whose path is a prefix of current path
  const matched = imageMap.find(item => pathname.startsWith(item.route));
  
  return (
    <Footer
      style={{
        margin: `0 20px 20px ${sidebarWidth}px`
      }}>
      <Divider plain>
        <img src={`${matched?.image}`}
             alt="brand-logo"
        />
      </Divider>
      <Flex justify="space-around">
        <Flex vertical align="start" gap="small">
          <Title level={4}>Products</Title>
          <Link>Why EmailFly?</Link>
          <Link>Product Updates</Link>
          <Link>Email Marketing</Link>
          <Link>Websites</Link>
        </Flex>
        
        <Flex vertical align="start" gap="small">
          <Title level={4}>Resources</Title>
          <Link>Marketing Library</Link>
          <Link>Free Marketing Tools</Link>
          <Link>Marketing Glossary</Link>
          <Link>Integrations Directory</Link>
        </Flex>
        
        <Flex vertical align="start" gap="small">
          <Title level={4}>Community</Title>
          <Link>Agencies & Freelancers</Link>
          <Link>Developers</Link>
          <Link>Events</Link>
        </Flex>
        
        <Flex vertical align="start" gap="small">
          <Title level={4}>Company</Title>
          <Link>Our Story</Link>
          <Link>Newsroom</Link>
          <Link>Transactional Email</Link>
          <Link>Careers</Link>
          <Link>Accessibility</Link>
        </Flex>
      </Flex>
    </Footer>
  );
};
