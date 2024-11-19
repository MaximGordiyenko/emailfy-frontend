import upload from '../../assets/images/upload.png';
import add from '../../assets/images/copy.png';
import cloud from '../../assets/images/upload-cloud.png';

export const AudienceMenu = ({ handleNav, handleNavManualAdd }) => {
  return (
    <div className={'upload-contacts'}>
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
  );
};
