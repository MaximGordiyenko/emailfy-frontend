import './styles.css';
import arrow from '../../../assets/images/leftArrGreen.png';
import { useFetcher, useNavigate, useParams } from 'react-router-dom';
import audience from '../../../assets/images/audience/audienceicon.png';
import ProgressBar from '../../../components/progress-bars/ProgressBar';
import sub from '../../../assets/images/subs.png';
import chat from '../../../assets/images/chat.png';
import magnet from '../../../assets/images/magnet.png';
import eye from '../../../assets/images/closedeye.png';
import team from '../../../assets/images/team.png';
import closeblack from '../../../assets/images/xblack.png';
import Dropdown from './dropdown/dropdown';
import { useEffect, useState } from 'react';
import './styles.css';
import { TagsInput } from 'react-tag-input-component';
import close from '../../../assets/images/xmark.png';
import { Tags } from './tagInput/TagInput';
import { ROUTE } from '../../../routes/routes.constants';
import { getHeaderConfigs } from '../../../components/header/header.constants';

const SegmentationModal = ({ isOpenModal, setIsOpenModal, navigate }) => {
  return (
    <div className={isOpenModal ? 'modal-window' : 'modal-hide'}>
      <div className="modal-content">
        <div className="inner-container">
          <div className="modal-manually-title">
            <h1>238 contacts</h1>
            <img src={closeblack} alt="bla" onClick={() => setIsOpenModal(false)} />
          </div>
          <p>
            Tags:
            <span> customer,</span>
            <span> passive,</span>
            <span> active,</span>
            <span> user,</span>
          </p>
          <p>
            Group:
            <span> Subscriber</span>
          </p>
          <hr />
        </div>
        <div className="table">
          <div className="title-wrapper">
            <div className="table-title">
              <span>Email</span>
              <span>First name</span>
              <span>Last name</span>
              <span>Address line</span>
            </div>
          </div>
        </div>
        <div className="btns-group">
          <button className="btn1" onClick={() => setIsOpenModal(false)}>
            <span>Back to aditting</span>
          </button>
          <button className="btn2" onClick={() => navigate('/getstarted')}>
            <span>Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const suggestTags = [
  { text: ' customer,' },
  { text: ' passive,' },
  { text: ' active,' },
  { text: ' user,' },
  { text: ' important,' },
  { text: ' general,' },
  { text: ' shared,' },
  { text: ' banned,' },
  { text: ' subscriber,' },
  { text: ' potential,' },
];

export const SegmentManually = () => {
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [isSelectedDropdown, setIsSelectedDropdown] = useState(false);
  console.log(selected);

  const onAddSuggestionTags = (item) => {
    setSelected((prevState) => [...prevState, item.target.outerText.slice(0, -2)]);
  };

  const handleOpenModalSegmentation = () => {
    setIsOpenModal(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  let { id } = useParams();
  const navigate = useNavigate();
  console.log(isSelectedDropdown, 'dropdown');

  const options = [
    { img: sub, label: 'Subscribers', value: 1 },
    { img: chat, label: 'SMS subscribers', value: 2 },
    { img: magnet, label: 'Engaged subscribers', value: 3 },
    { img: eye, label: 'Sleeping subscribers', value: 4 },
    { img: team, label: 'My team', value: 5 },
  ];

  getHeaderConfigs(navigate, handleOpenModalSegmentation, selected, isSelectedDropdown);

  return (
    <div className="segment-wrapper" id={id}>
      <div className="pg-bars">
        <ProgressBar bgcolor="#7E9D00" completed={100} className="progress-bar" />
      </div>
      <div className="inner-box">
        <div className="segm-title-manual">
          <h1 className="count">2/2</h1>
          <h1>Segmentation</h1>
        </div>
        <div className="segm-group">
          <div className="tips">
            <ul>
              <li>
                Tagging will help you sort and search your contacts by categories and criteria more
                conveniently
              </li>
              <li>You must add some category for your contacts</li>
            </ul>
          </div>
          <div className="upload-group"></div>
        </div>
        <SegmentationModal
          setIsOpenModal={setIsOpenModal}
          isOpenModal={isOpenModal}
          navigate={navigate}
        />
        <div className="selection">
          <div className="tags">
            <label>Search for or create tags</label>
            <TagsInput
              value={selected}
              onChange={setSelected}
              onRemoved={deleteTag}
              name="fruits"
              placeHolder={selected.length >= 1 ? '' : 'Start typing to add a custom tag'}
            />
            <p>
              Suggested tags:
              {suggestTags.map((item, index) => {
                return (
                  <span key={index} onClick={onAddSuggestionTags}>
                    {item.text}
                  </span>
                );
              })}
            </p>
          </div>
          <div className="dropdown">
            <label>Select group</label>
            <Dropdown
              options={options}
              onChange={() => {
                setIsSelectedDropdown(true);
              }}
              placeHolder={'Not selected yet'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
