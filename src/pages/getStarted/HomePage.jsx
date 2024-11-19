import './style.scss';
import circle from '../../assets/images/CheckCircle.png';
import ProgressBar from '../../components/progress-bars/ProgressBar';

export const HomePage = () => {
  const completed = 1;
  return (
    <div className="get-started">
      <div className="welcome">
        <h1>Welcome to Emailfy!</h1>
        <p>
          lets try out the full functionality of Emailfy so that you and your customers get the best
          possible experience with us
        </p>
      </div>
      <div className="progress-box">
        <span>{completed}% Completed</span>
        <ProgressBar bgcolor="#1bbda0" completed={1} />
      </div>
      <div className="checkpoints">
        <div className="first-quest">
          <img src={circle} alt="check" />
          <div className="description">
            <span>Create and fill your account</span>
            <p>
              First of all, you need to create an account and fill out all the necessary profile
              information
            </p>
          </div>
        </div>
        <div className="sec-quest">
          <img src={circle} alt="check2" />
          <div className="description">
            <span>Add your first audience</span>
            <p>
              Audiences combine users of the same type into a common category, where they will be
              easier and more convenient to manage
            </p>
            <button>
              <span>Create first audience</span>
            </button>
          </div>
        </div>
        <div className="thrd-quest">
          <img src={circle} alt="check3" />
          <div className="description">
            <span>Create your first tag</span>
            <p>Tags complement your audience and help sort your contacts more accurately</p>
            <button>
              <span>Create first tag</span>
            </button>
          </div>
        </div>
        <div className="fourth-quest">
          <img src={circle} alt="check4" />
          <div className="description">
            <span>Create your first campaign</span>
            <p>Tags complement your audience and help sort your contacts more accurately</p>
            <button>
              <span>Create first campaign</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
