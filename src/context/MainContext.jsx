import { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getClientEmails } from '../api/dashboard/dashboard';

const MainContext = createContext(null);

export const MainProvider = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
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
        isOpenMenu,
        setIsOpenMenu,
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
