import { FILTERED_CARDS, STATUSES, COLORS  } from './campaign.constants.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../api/API.js';
import * as templatesAPI from '../../api/builder/templates.js';
import * as tasksAPI from '../../api/task/tasks.js';
import { format } from 'date-fns';
import emails from '../../assets/images/emails.png';
import * as builderTemplate from '../mail-builder-page/builder-script/builderTemplate.js';
import { ROUTE } from '../../routes/routes.constants.js';
import { Typography, Tabs, Card, Flex, Rate, Input } from 'antd';
import {
  FolderOpenOutlined, ClockCircleOutlined, ScheduleOutlined, FileDoneOutlined,
  UnorderedListOutlined, EditOutlined, DeleteOutlined, HeartOutlined, MailOutlined
} from '@ant-design/icons';
import './styles.css';

const { Text, Title } = Typography;
const { Search } = Input;

const CardTitle = ({ title }) => {
  return (
    <Flex align="center">
      <MailOutlined className="title-mail-icon"/>
      <Title level={4}>{title}</Title>
    </Flex>
  );
};

export const CampaignsList = () => {
  const [filterCards, setFilteredCards] = useState(FILTERED_CARDS);
  const [activeKey, setActiveKey] = useState('1'); // State to control active tab
  const [searchTerm, setSearchTerm] = useState('');
  
  const onChange = (key) => {
    setActiveKey(key);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   (async () => {
  //     const access_token = getToken('accessToken');
  //     const templates = (await templatesAPI?.get_templates(access_token))?.data;
  //     const tasks = (await tasksAPI.list(access_token)).data;
  //     const cards = templates?.map((template) => {
  //       const task = tasks.find((task) => task.template_id === template.id);
  //       const status = task ? STATUSES[task.status] : 'Draft';
  //       const color = task ? COLORS[task.status] : '#a5a5a5';
  //       const date = format(new Date(template.created_at), 'MMM d, hh:mm a');
  //       return {
  //         id: template.id,
  //         img: emails,
  //         title: template.name,
  //         status,
  //         des: `Created ${date}`,
  //         color,
  //         isDeleted: false
  //       };
  //     });
  //     setFilteredCards(cards);
  //   })();
  // }, []);
  
  const handleDeleteCard = (index) => {
    const updatedFilteredCards = [...filterCards];
    const template_id = updatedFilteredCards[index].id;
    (async () => {
      const access_token = getToken('accessToken');
      await templatesAPI.delete_template(access_token, template_id);
    })();
    updatedFilteredCards.splice(index, 1);
    setFilteredCards(updatedFilteredCards);
  };
  
  const onOpenTemplate = async (template_id) => {
    builderTemplate.setCurrentTemplateId(template_id);
    const type = await builderTemplate.getEditorType();
    switch (type) {
      case 'builder':
        navigate(`${ROUTE.campaignsPage}/${ROUTE.uploadHtml}`);
        break;
      case 'html':
        navigate(`${ROUTE.uploadHtml}`);
        break;
      case 'text':
        navigate(`/${ROUTE.campaignsPage}/${ROUTE.createText}`);
        break;
      default:
        navigate(`/${ROUTE.mailBuilderPage}`);
        break;
    }
  };
  
  const renderCardContent = (card) => (
    <Card
      key={card?.id}
      title={<CardTitle title={card?.title}/>}
      size="small"
      extra={[
        <DeleteOutlined key="delete" className="delete-icon" onClick={() => handleDeleteCard(card.id)}/>,
        <EditOutlined key="edit" className="edit-icon"/>,
        <Rate
          allowClear
          value={true}
          count={1}
          onChange={(val) => !val}
          character={<HeartOutlined/>}
          key="Favorite"
        />
      ]}
      style={{ border: `3px solid ${card.color}` }}>
      <Text>{card.des}</Text>
    </Card>
  );
  
  const renderTabContent = (status) => {
    let filteredCards;
    if (status === 'All') {
      filteredCards = FILTERED_CARDS;
    } else {
      filteredCards = FILTERED_CARDS.filter((card) => card.status === status);
    }
    
    if (searchTerm) {
      filteredCards = filteredCards.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return (
      <Flex vertical>
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => renderCardContent(card))
        ) : (
          <Text>No cards found for this status.</Text>
        )}
      </Flex>
    );
  };
  
  const TABS = [
    { key: '1', icon: <FolderOpenOutlined/>, label: 'All' },
    { key: '2', icon: <ClockCircleOutlined/>, label: 'Ongoing' },
    { key: '3', icon: <ScheduleOutlined/>, label: 'Scheduled' },
    { key: '4', icon: <FileDoneOutlined/>, label: 'Completed' },
    { key: '5', icon: <UnorderedListOutlined/>, label: 'Draft' }
  ];
  
  return (
    <>
      <Search
        placeholder="Search by title"
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Tabs
        tabPosition={'left'}
        centered={false}
        size="large"
        activeKey={activeKey} // Set the active key
        onChange={onChange} // Update activeKey on tab change
        items={TABS.map(tab => ({
          ...tab,
          children: renderTabContent(tab.label, searchTerm)
        }))}
      />
    </>
  );
};
