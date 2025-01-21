import { useState } from 'react';
import { useMainContext } from '../../context/MainContext';

import { Outlet } from 'react-router-dom';

import { CampaignMenu } from './campaign-menu/CampaignMenu';
import { CampaignModal } from './createCampaignModal/CampaignModal';
import './styles.css';

export const CampaignsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const { isOpenMenuCampaign, setIsOpenMenuCampaign } = useMainContext();
  
  return (
    <div className="campaigns-page-container">
      {isOpenMenuCampaign && <CampaignMenu onOpenModal={() => setIsModalOpen((prev) => !prev)}/>}
      
      <CampaignModal
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
        open={isModalOpen}
        onCancel={() => setIsModalOpen((prev) => !prev)}
        setIsOpenMenu={() => setIsOpenMenuCampaign((prev) => !prev)}
      />
      
      <Outlet/>
    </div>
  );
};
