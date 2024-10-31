import './style.scss';
import audienceListEmpty from '../../../assets/images/audienceListEmpty.svg';
import dropdown from '../../../assets/images/shevrone.png';
import arrUp from '../../../assets/images/Vector.png';
import audience from '../../../assets/images/audience/audienceicon.png';
import upload from '../../../assets/images/upload.png';
import add from '../../../assets/images/copy.png';
import cloud from '../../../assets/images/upload-cloud.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AudienceList } from './audienceList/AudienceList';
import * as groupApi from '../../../api/subscribes/groups';
import { getAccessToken } from '../../../api/auth/auth';
import BrandHeader from '../../../components/header/BrandHeader';

export const AudiencePage = () => {
  const [isShowContacts, setisShowContacts] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    (async () => {
      const access_token = await getAccessToken();
      const rootGroup = (await groupApi.get_root(access_token)).data;
      const groups = (await groupApi.get_subgroups(access_token, rootGroup.id)).data;
      setisShowContacts(groups.length > 0);
    })();
  }, []);

  const handleUpload = () => {
    if (isUpload) {
      setIsUpload(false);
    } else {
      setIsUpload(true);
    }
  };

  const handleClick = () => {
    setisShowContacts(true);
  };

  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/audience/upload', { replace: true });
  };

  const handleNavManualAdd = () => {
    navigate('/audience/uploadmanually', { replace: true });
  };

  const headerContent = () => {
    return (
      <>
        <button onClick={handleUpload} className={'audience-btn-dropdown'}>
          <span>Add contacts</span>
          <img src={isUpload ? arrUp : dropdown} alt="header-dropdown" />
        </button>
      </>
    );
  };
  return (
    <div className="audience" id="audience">
      <BrandHeader icon={audience} description={'Audience'} content={headerContent()} />
      <div className={isUpload ? 'upload-contacts' : 'hide-upload'}>
        <div className="cards">
          <div className="card1" onClick={handleNav}>
            <img src={upload} alt="upload" />
            <div className="upload-des">
              <h4>Upload file</h4>
              <p>Import contacts from a CSV or tab-delimited TXT file More info</p>
            </div>
          </div>
          <div className="card2" onClick={handleNavManualAdd}>
            <img src={add} alt="upload" />
            <div className="upload-des">
              <h4>Add manually</h4>
              <p>Directly pate in new contacts from a speedheet or similar list</p>
            </div>
          </div>
          <div className="import">
            <div className="cooming-soon">
              <span>Cooming soon</span>
            </div>
            <img src={cloud} alt="upload" />
            <div className="upload-des">
              <h4>Import</h4>
              <p>Sync your contacts lists with Mailchimp, Shopify, Ortto, etc.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="audience-content">
        {/*{isShowContacts ? (*/}
        <div className={isUpload ? 'bars-moved' : 'audience-bars'}>
          <div className="aud-title">
            <h1>Audience</h1>
            <button className={isUpload ? 'drafts' : 'drafts-hide'}>
              <span>Drafts</span>
            </button>
          </div>
          <AudienceList />
        </div>
        {/*) : (*/}
        <div className="audience-preview">
          <img src={audienceListEmpty} alt="aud" />
          <div className="audience-desc">
            <h3>Build your audience!</h3>
            <p>
              {`Add contacts to your audience to launch an effective campaign. Choose a convenient way to add contacts: import via CSV file, manual adding or import from mailchimp.`}
            </p>
          </div>
          <button onClick={handleClick}>
            <span>Add your audience</span>
          </button>
        </div>
        {/*)}*/}
      </div>
    </div>
  );
};
