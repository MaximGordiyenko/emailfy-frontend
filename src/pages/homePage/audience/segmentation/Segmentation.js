import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import audience from '../../../../assets/images/audienceicon.png';
import ProgressBar from '../../../../components/progressBar/ProgressBar';
import Dropdown from './dropdown/dropdown';
import { useEffect, useState } from 'react';
import './style.scss';
import { TagsInput } from 'react-tag-input-component';
import CustomDropdown from '../../../../components/dropdownComponent/CustomDropdown';
import checked from '../../../../assets/images/Check Circle.svg';
import { getAccessToken } from '../../../../api/auth/auth';
import * as groupApi from '../../../../api/subscribes/groups';
import { start_import_csv } from '../../../../api/subscribes/import_csv';
import { useSelector } from 'react-redux';
import BrandHeader from '../../../../components/header/BrandHeader';

export const Segmentation = () => {
  const [selected, setSelected] = useState([]);
  const [isSelectedDropdown, setIsSelectedDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  console.log(selectedGroupId, 'selected group_id');

  const uploadedFile = useSelector((state) => state.file.uploadedFile);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const access_token = await getAccessToken();
        const rootGroup = (await groupApi.get_root(access_token)).data;
        const subgroups = (await groupApi.get_subgroups(access_token, rootGroup.id)).data;
        const options = [
          { value: rootGroup.id, label: rootGroup.name },
          ...subgroups.map((group) => ({ value: group.id, label: group.name })),
        ];
        setDropdownOptions(options);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    console.log(selectedGroupId, 'selected group_id');
    fetchGroups();
  }, []);

  console.log(uploadedFile, 'uploadedFiles');

  const headerContent = () => {
    return (
      <div className="upload-group">
        <button className="back" onClick={handleNav}>
          <span>Back</span>
        </button>
        <button className="continue" disabled={!isSelectedDropdown} onClick={handleSubmit}>
          <span>Submit</span>
        </button>
      </div>
    );
  };

  const handleAddSuggestion = (item) => {
    setSelected((prevState) => [...prevState, item.target.outerText.slice(0, -2)]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const access_token = await getAccessToken();
    const file = new File([uploadedFile.data], uploadedFile.name, { type: uploadedFile.type });
    formData.append('csv', file);
    try {
      if (selectedGroupId && formData) {
        const response = await start_import_csv(
          access_token,
          selectedGroupId,
          formData,
          'mailchimp',
        );
        console.log('(response)CSV import started:', response);
      } else {
        console.error('Missing selected group ID or formData');
      }
    } catch (error) {
      console.error('Error starting CSV import:', error);
    }
    setTimeout(() => {
      navigate('/audience', { replace: true });
    }, 500);
  };

  console.log(dropdownOptions, 'dropdown options');

  let { id } = useParams();
  const navigate = useNavigate();
  const handleNav = () => {
    navigate('/audience/upload', { replace: true });
  };

  const handleSelect = (selectedOption) => {
    console.log(`Selected option: ${selectedOption}`);
    setSelectedList(selectedOption);
    setIsSelectedDropdown(true);
    setSelectedGroupId(selectedOption.props.value);
  };

  return (
    <div className="segment-wrapper" id={id}>
      <BrandHeader
        description={'Audience'}
        params={'Add contacts via file'}
        icon={audience}
        content={headerContent()}
      />
      <div className="pg-bars">
        <div className="progress-bar-upload">
          <ProgressBar bgcolor="#7E9D00" completed={100} className="progress-bar" />
        </div>
      </div>
      <div className="inner-box">
        <div className="segm-title">
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
        </div>
        <CustomDropdown
          options={dropdownOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          placeholder={'Not selected yet'}
          label={'Select list'}
          onSelect={handleSelect}
          isCheckImg={checked}
        />
        <div className={'placeholder'}>
          <div className={'hr1'} />
          <span className={'placeholder-text'}>Will be available later</span>
          <div className={'hr2'} />
        </div>
        <div className="selection-segment">
          <div className="tags">
            <label>Search for or create tags</label>
            <TagsInput
              value={selected}
              onChange={setSelected}
              name="fruits"
              placeHolder={selected.length >= 1 ? '' : 'Start typing to add a custom tag'}
            />
            <p>
              Suggested tags:
              {[
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
              ].map((item, index) => {
                return (
                  <span key={index} onClick={handleAddSuggestion}>
                    {item.text}{' '}
                  </span>
                );
              })}
            </p>
          </div>
          <div className="dropdown">
            <label>Select group</label>
            <Dropdown
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
