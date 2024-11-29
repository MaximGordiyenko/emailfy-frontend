import { useState, useEffect } from 'react';
import { useMainContext } from '../../context/MainContext';

import { useNavigate, Outlet } from 'react-router-dom';
import { format } from 'date-fns';

import * as tasksAPI from '../../api/task/tasks';
import { getToken } from '../../api/API';

import search from '../../assets/images/search.png';
import emails from '../../assets/images/emails.png';
import deleted from '../../assets/images/deleteTag.png';
import startCampaign from '../../assets/images/compaigns/Frame 981318.svg';
import notFound from '../../assets/images/compaigns/Frame 981286.svg';

import { CampaignMenu } from './campaign-menu/CampaignMenu';
import { CampaignModal } from './createCampaignModal/CampaignModal';

import { TAB_ITEMS } from './campaigns.constants';

import * as templatesAPI from '../../api/builder/templates';
import * as scriptAPI from '../../api/builder/script';
import * as builderTemplate from '../mail-builder-page/builder-script/builderTemplate';
import './styles.css';
import { ROUTE } from '../../routes/routes.constants';
import { EmptyPlaceholder } from '../../components/placeholders/EmptyPlaceholder';

const STATUSES = {
  in_queue: 'Scheduled',
  ready: 'Scheduled',
  in_progress: 'Ongoing',
  finished: 'Completed',
  overload: 'Failed',
  access_error: 'Failed',
  data_error: 'Failed',
  server_error: 'Failed',
};

const COLORS = {
  in_queue: '#EDB833',
  ready: '#EDB833',
  in_progress: '#3F93F7',
  finished: '#1BBDA0',
  overload: '#FF4444',
  access_error: '#FF4444',
  data_error: '#FF4444',
  server_error: '#FF4444',
};

export const CampaignsPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchActive, setSearchActive] = useState('');
  const [isShowContent, setisShowContent] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearchResults, setHasSearchResults] = useState(true);
  const [filterCards, setFilteredCards] = useState([]);

  const navigate = useNavigate();

  const { isOpenMenu } = useMainContext();

  const handleRowHover = (event, rowIndex) => setHoveredIndex(rowIndex);
  const handleRowHoverLeave = () => setHoveredIndex(null);

  const handleShowContent = () => {
    setisShowContent(true);
  };

  useEffect(() => {
    (async () => {
      const access_token = getToken('accessToken');
      const templates = (await templatesAPI?.get_templates(access_token))?.data;
      const tasks = (await tasksAPI.list(access_token)).data;
      const cards = templates?.map((template) => {
        const task = tasks.find((task) => task.template_id === template.id);
        const status = task ? STATUSES[task.status] : 'Draft';
        const color = task ? COLORS[task.status] : '#a5a5a5';
        const date = format(new Date(template.created_at), 'MMM d, hh:mm a');
        return {
          id: template.id,
          img: emails,
          title: template.name,
          status,
          des: `Created ${date}`,
          color,
          isDeleted: false,
        };
      });
      setFilteredCards(cards);
    })();
  }, []);

  const placeholder = (
    <div className={'placeholder-wrapper'}>
      <img src={startCampaign} alt={'start-campaign'} />
      <div className={'placeholder-des'}>
        <h2 className={'place-title'}>Start your new campaign!</h2>
        <p className={'place-text'}>
          Create an effective email campaign to connect with your audience, build brand awareness,
          and drive more sales.
        </p>
      </div>
      <button onClick={handleShowContent} className={'create-btn-holder'}>
        <span>Create campaign</span>
      </button>
    </div>
  );

  const filteredCards = filterCards.filter((card) => {
    if (selectedStatus === 'All' && !searchQuery) {
      return true;
    }

    const matchesStatus = selectedStatus === 'All' || card.status === selectedStatus;
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

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
        navigate(`/${ROUTE.mailBuilderPage}`);
        break;
      case 'html':
        navigate(`/${ROUTE.campaigns}/${ROUTE.createHtml}`);
        break;
      case 'text':
        navigate(`/${ROUTE.campaigns}/${ROUTE.createText}`);
        break;
      default:
        navigate(`/${ROUTE.mailBuilderPage}`);
        break;
    }
  };

  const searchActiveHandler = (value) => () => setSearchActive(value);

  useEffect(() => {
    setHasSearchResults(filteredCards.length > 0);
  }, [filteredCards]);

  return (
    <div className="campaigns-page-container">
      {isOpenModal && <CampaignModal closeModal={() => setIsOpenModal((prev) => !prev)} />}

      {isOpenMenu && <CampaignMenu onOpenModal={() => setIsOpenModal((prev) => !prev)} />}

      {isShowContent ? (
        <div className="campaigns-box">
          <div className="inner-box">
            <div className="tabs">
              <div className="tabs-title">
                <span>Sort by Status</span>
              </div>
              <div className="upper-container">
                {TAB_ITEMS.map((items, i) => (
                  <div
                    key={i}
                    className={`link ${selectedStatus === items.text ? 'active' : ''}`}
                    onClick={() => setSelectedStatus(items.text)}>
                    <img className="link-img" src={items.img} alt={items.text} />
                    <span className="link-text">{items.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="cards">
              <div className={`search-input ${searchActive}`}>
                <img src={search} alt="" />
                <input
                  placeholder="Email, name, address, etc..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={searchActiveHandler('active')}
                  onBlur={searchActiveHandler('')}
                />
              </div>
              {hasSearchResults ? (
                filteredCards
                  .filter((card) => {
                    if (selectedStatus === 'All') {
                      return true;
                    }
                    return card.status === selectedStatus;
                  })
                  .map((item, index) => {
                    const isDeleted = item.isDeleted;
                    return (
                      <div
                        className={`card ${isDeleted ? 'fade-out' : ''}`}
                        key={index}
                        onMouseEnter={(e) => handleRowHover(e, index)}
                        onMouseLeave={(e) => handleRowHoverLeave(e, index)}
                        onClick={() => onOpenTemplate(item.id)}>
                        <div
                          id="buttons"
                          style={
                            index === hoveredIndex
                              ? { display: 'flex', position: 'absolute' }
                              : { display: 'none' }
                          }
                          className="button-wrapper">
                          <img
                            src={deleted}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCard(index);
                            }}
                            className="card-image-button"
                            alt="delete icon"
                          />
                        </div>
                        <img className="card-image" src={item.img} alt="" />
                        <div className="card-content">
                          <div className="card-title">
                            {item.title && <span>{item.title}</span>}
                            {
                              <div className="tab-select" style={{ background: item.color }}>
                                <span className="tab-select-text">{item.status}</span>
                              </div>
                            }
                          </div>
                          <span className="des">{item.des}</span>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <EmptyPlaceholder />
              )}
            </div>
          </div>
        </div>
      ) : (
        placeholder
      )}
    </div>
  );
};
