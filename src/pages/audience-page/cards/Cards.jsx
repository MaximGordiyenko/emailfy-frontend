import './style.scss';
import sub from '../../../assets/images/subs.png';
import chat from '../../../assets/images/chat.png';
import magnet from '../../../assets/images/magnet.png';
import eye from '../../../assets/images/closedeye.png';
import team from '../../../assets/images/team.png';
import dots from '../../../assets/images/auddots.png';

export const Cards = () => {
  return (
    <div className="bars">
      <div className="bar1">
        <div className="title">
          <img src={sub} alt="note" />
          <div className="description-block">
            <span>Subscriptions</span>
            <p>
              Tags: <a href="/#">subscriber,</a> <a href="/#">customer,</a> <a href="/#">passive</a>
            </p>
          </div>
        </div>
        <div className="main-stats">
          <div className="stat1">
            <span>Members</span>
            <h3>688</h3>
          </div>
          <div className="stat2">
            <span>Subscribers</span>
            <h3>228</h3>
          </div>
          <div className="stat3">
            <span>Addedd last 30 days</span>
            <h3>153</h3>
          </div>
          <img className="dots" src={dots} alt="dots" />
        </div>
      </div>
      <div className="bar2">
        <div className="title">
          <img src={chat} alt="note" />
          <div className="description-block">
            <span>SMS Subscribers</span>
            <p>
              Tags: <a href="/#">subscriber,</a> <a href="/#">customer,</a> <a href="/#">passive</a>
            </p>
          </div>
        </div>
        <div className="main-stats">
          <div className="stat1">
            <span>Members</span>
            <h3>688</h3>
          </div>
          <div className="stat2">
            <span>Subscribers</span>
            <h3>228</h3>
          </div>
          <div className="stat3">
            <span>Addedd last 30 days</span>
            <h3>153</h3>
          </div>
          <img className="dots" src={dots} alt="dots" />
        </div>
      </div>
      <div className="bar3">
        <div className="title">
          <img src={magnet} alt="note" />
          <div className="description-block">
            <span>Engaged Subscribers</span>
            <p>
              Tags: <a href="/#">subscriber,</a> <a href="/#">customer,</a> <a href="/#">passive</a>
            </p>
          </div>
        </div>
        <div className="main-stats">
          <div className="stat1">
            <span>Members</span>
            <h3>688</h3>
          </div>
          <div className="stat2">
            <span>Subscribers</span>
            <h3>228</h3>
          </div>
          <div className="stat3">
            <span>Addedd last 30 days</span>
            <h3>153</h3>
          </div>
          <img className="dots" src={dots} alt="dots" />
        </div>
      </div>
      <div className="bar4">
        <div className="title">
          <img src={eye} alt="note" />
          <div className="description-block">
            <span>Sleeping Subscribers</span>
            <p>
              Tags: <a href="/#">subscriber,</a> <a href="/#">customer,</a> <a href="/#">passive</a>
            </p>
          </div>
        </div>
        <div className="main-stats">
          <div className="stat1">
            <span>Members</span>
            <h3>688</h3>
          </div>
          <div className="stat2">
            <span>Subscribers</span>
            <h3>228</h3>
          </div>
          <div className="stat3">
            <span>Addedd last 30 days</span>
            <h3>153</h3>
          </div>
          <img className="dots" src={dots} alt="dots" />
        </div>
      </div>
      <div className="bar5">
        <div className="title">
          <img src={team} alt="note" />
          <div className="description-block">
            <span>My team</span>
            <p>
              Tags: <a href="/#">subscriber,</a> <a href="/#">customer,</a> <a href="/#">passive</a>
            </p>
          </div>
        </div>
        <div className="main-stats">
          <div className="stat1">
            <span>Members</span>
            <h3>688</h3>
          </div>
          <div className="stat2">
            <span>Subscribers</span>
            <h3>228</h3>
          </div>
          <div className="stat3">
            <span>Addedd last 30 days</span>
            <h3>153</h3>
          </div>
          <img className="dots" src={dots} alt="dots" />
        </div>
      </div>
    </div>
  );
};
