import React, { useState } from 'react';
import { changeTags } from '../../tags.constants';
import newarrup from '../../../../assets/images/newarrup.svg';
import newarrdown from '../../../../assets/images/newarrdown.svg';

export const ChangeTagsComponent = ({ isOpenRowCountBar, isChangeTag, setIsChangeTag }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (index) => {
    setSelectedTag(index);
  };

  const renderedChangeTags = () => {
    return changeTags.map((item, i) => {
      return (
        <div className={'change-tag-container'} key={i}>
          <input
            type="checkbox"
            className={'custom-checkbox'}
            checked={i === selectedTag}
            onChange={() => handleTagClick(i)}
          />
          <div>{item.name}</div>
        </div>
      );
    });
  };

  return (
    <>
      <div>{renderedChangeTags()}</div>
      <div className={isOpenRowCountBar === true ? 'bottom-bar' : 'bottom-bar-hidden'}>
        <div>Selected all contacts</div>
        <button
          className={'change-tag'}
          onClick={() => {
            setIsChangeTag((prev) => !prev);
          }}>
          <div>Change tag</div>
          <img src={isChangeTag ? newarrup : newarrdown} />
        </button>
      </div>
    </>
  );
};
