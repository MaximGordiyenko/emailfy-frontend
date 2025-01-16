import { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getClientEmails } from '../api/dashboard/dashboard.js';

const MainContext = createContext(null);

export const MainProvider = ({ children }) => {
  const [isOpenMenuAudience, setIsOpenMenuAudience] = useState(false);
  
  const [isOpenMenuCampaign, setIsOpenMenuCampaign] = useState(false);
  const [isOpenSendMailModal, setIsOpenSendMailModal] = useState(false);
  const [mediaQuery, setMediaQuery] = useState(70);
  
  const [isOpenMenuTag, setIsOpenMenuTag] = useState(false);
  
  const [selectedEmailClientID, setSelectedEmailClientID] = useState(null);
  const [emailCampaignStep, setEmailCampaignStep] = useState(0);
  const [isSegmentationSelectedDropdown, setIsSegmentationSelectedDropdown] = useState(false);

  const { data: clientEmailsData } = useQuery({
    queryKey: ['getClientEmails'],
    queryFn: getClientEmails,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {},
  });

  const emailClientOptions = clientEmailsData?.map((item) => {
    return {
      value: item.id,
      label: item.email,
    };
  });

  return (
    <MainContext.Provider
      value={{
        isOpenMenuAudience, setIsOpenMenuAudience,
        isOpenMenuCampaign, setIsOpenMenuCampaign,
        isOpenSendMailModal, setIsOpenSendMailModal,
        mediaQuery, setMediaQuery,
        isOpenMenuTag, setIsOpenMenuTag,
        emailClientOptions,
        selectedEmailClientID,
        setSelectedEmailClientID,
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
