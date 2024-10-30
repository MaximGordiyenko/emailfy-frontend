import './style.scss';
import emails from '../../../../assets/images/letter-green.svg';
import abTesting from '../../../../assets/images/switchers-grey.svg';
import journey from '../../../../assets/images/shareCircle-grey.svg';

export const SubHeader = ({ handleOpenModal }) => {
  return (
    <div className={'upload-campaign'}>
      <div className="cards">
        <div className="email" onClick={handleOpenModal}>
          <img src={emails} alt="upload" />
          <div className="upload-des">
            <div className="upload-des-label">
              <span>Email</span>
            </div>
            <span className="upload-des-text">
              Upload, write, or design: create your most impactful email campaign right away
            </span>
          </div>
        </div>
        <div className="abTesting">
          <div className="coming-soon">
            <span>Coming soon</span>
          </div>
          <img src={abTesting} alt="upload" />
          <div className="upload-des">
            <div className="upload-des-label">
              <span>A/B Testing</span>
            </div>
            <span className="upload-des-text">
              Test various emails within a campaign to determine the most effective
            </span>
          </div>
        </div>
        <div className="journey">
          <div className="coming-soon">
            <span>Coming soon</span>
          </div>
          <img src={journey} alt="upload" />
          <div className="upload-des">
            <div className="upload-des-label">
              <span>Automations</span>
            </div>
            <span className="upload-des-text">
              Create visual customers&apos; journeys and automate your outreach
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
