import { useState } from 'react';
import { useMainContext } from '../../context/MainContext';

import { Outlet } from 'react-router-dom';

import { CampaignMenu } from './campaign-menu/CampaignMenu';
import { CampaignModal } from './createCampaignModal/CampaignModal';
import './styles.css';

export const CampaignsPage = () => {
  const { isOpenMenu, setIsOpenMenu } = useMainContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="campaigns-page-container">
      {isOpenMenu && <CampaignMenu onOpenModal={() => setIsModalOpen((prev) => !prev)} />}

      <CampaignModal
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
        open={isModalOpen}
        onCancel={() => setIsModalOpen((prev) => !prev)}
        setIsOpenMenu={() => setIsOpenMenu((prev) => !prev)}
      />

      <Outlet />
    </div>
  );
};
