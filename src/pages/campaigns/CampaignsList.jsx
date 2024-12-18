import { TAB_ITEMS } from './campaigns.constants';
import deleted from '../../assets/images/deleteTag.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../api/API';
import * as templatesAPI from '../../api/builder/templates';
import * as tasksAPI from '../../api/task/tasks';
import { format } from 'date-fns';
import emails from '../../assets/images/emails.png';
import * as builderTemplate from '../mail-builder-page/builder-script/builderTemplate';
import { ROUTE } from '../../routes/routes.constants';
import { STATUSES, COLORS } from './campaign.constants';

export const CampaignsList = () => {
  const [searchActive, setSearchActive] = useState('');
  const [isShowContent, setisShowContent] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearchResults, setHasSearchResults] = useState(true);
  const [filterCards, setFilteredCards] = useState([]);

  const navigate = useNavigate();

  const handleRowHover = (event, rowIndex) => setHoveredIndex(rowIndex);
  const handleRowHoverLeave = () => setHoveredIndex(null);

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
        navigate(`${ROUTE.campaignsPage}/${ROUTE.createHtml}`);
        break;
      case 'html':
        navigate(`${ROUTE.createHtml}`);
        break;
      case 'text':
        navigate(`/${ROUTE.campaignsPage}/${ROUTE.createText}`);
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
            <input
              placeholder="Email, name, address, etc..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={searchActiveHandler('active')}
              onBlur={searchActiveHandler('')}
            />
          </div>
          {filteredCards
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
            })}
        </div>
      </div>
    </div>
  );
};
