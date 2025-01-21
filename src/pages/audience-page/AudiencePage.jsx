import { useState, useEffect } from 'react';
import { useMainContext } from '../../context/MainContext.jsx';

import { useNavigate, Outlet } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants.js';

import { AudienceList } from './audienceList/AudienceList.jsx';
import { AudienceMenu } from './AudienceMenu.jsx';

import { getToken } from '../../api/API.js';
import { get_subgroups, get_root } from '../../api/subscribes/groups.js';

import audienceListEmpty from '../../assets/images/audienceListEmpty.svg';
import dropdown from '../../assets/images/shevrone.png';
import arrUp from '../../assets/images/Vector.png';

import { CampaignMenu } from '../campaign-page/campaign-menu/CampaignMenu.jsx';
import './styles.css';
import { AudienceEmptyPlaceholder } from './AudienceEmptyPlaceholder.jsx';

export const AudiencePage = () => {
  const [isShowContacts, setisShowContacts] = useState(false);
  const [isUpload, setIsUpload] = useState(true);

  const { isOpenMenuAudience, setIsOpenMenuAudience } = useMainContext();

  const navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     const access_token = getToken('accessToken');
  //     const rootGroup = (await get_root(access_token))?.data;
  //     const groups = (await get_subgroups(access_token, rootGroup.id)).data;
  //     // setisShowContacts(groups.length > 0);
  //   })();
  // }, []);

  return (
    <div className="audience-page-container" id="audience">
      {isOpenMenuAudience && (
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
