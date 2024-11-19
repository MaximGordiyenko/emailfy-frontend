import { createContext, useContext, useState } from 'react';

const MainContext = createContext(null);

export const MainProvider = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [emailCampaignStep, setEmailCampaignStep] = useState(0);
  const [isSegmentationSelectedDropdown, setIsSegmentationSelectedDropdown] = useState(false);

  return (
    <MainContext.Provider
      value={{
        isOpenMenu,
        setIsOpenMenu,
        emailCampaignStep,
        setEmailCampaignStep,
        isSegmentationSelectedDropdown,
        setIsSegmentationSelectedDropdown,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
