import { useState, useEffect } from 'react';
import { useMainContext } from '../../context/MainContext';

import { useNavigate, Outlet } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { AudienceList } from './audienceList/AudienceList';
import { AudienceMenu } from './AudienceMenu';

import { getToken } from '../../api/API';
import { get_subgroups, get_root } from '../../api/subscribes/groups';

import audienceListEmpty from '../../assets/images/audienceListEmpty.svg';
import dropdown from '../../assets/images/shevrone.png';
import arrUp from '../../assets/images/Vector.png';

import { CampaignMenu } from '../campaigns/campaign-menu/CampaignMenu';
import './styles.css';
import { AudienceEmptyPlaceholder } from './AudienceEmptyPlaceholder';

export const AudiencePage = () => {
  const [isShowContacts, setisShowContacts] = useState(false);
  const [isUpload, setIsUpload] = useState(true);

  const { isOpenMenu } = useMainContext();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const access_token = getToken('accessToken');
      const rootGroup = (await get_root(access_token))?.data;
      const groups = (await get_subgroups(access_token, rootGroup.id)).data;
      // setisShowContacts(groups.length > 0);
    })();
  }, []);

  return (
    <div className="audience-page-container" id="audience">
      {isOpenMenu && (
        <AudienceMenu
          handleNav={() =>
            navigate(`/${ROUTE.audiencePage}/${ROUTE.uploadFile}`, { replace: true })
          }
          handleNavManualAdd={() =>
            navigate(`/${ROUTE.audiencePage}/${ROUTE.manualUpload}`, { replace: true })
          }
        />
      )}
      <Outlet />
    </div>
  );
};
