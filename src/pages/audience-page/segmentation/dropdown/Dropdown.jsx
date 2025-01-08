import React, { useEffect, useRef, useState } from 'react';
import deleteFile from '../../../../assets/images/deleteFile.png';
import dropdown from '../../../../assets/images/dropdownActive.png';
import dropdownclose from '../../../../assets/images/blackdropdown.png';
import './dropdown.scss';

const Dropdown = ({ placeHolder, options, isMulti, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });
  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option) => (
            <div key={option.value} className="dropdown-tag-item">
              {option.label}
              <span onClick={(e) => onTagRemove(e, option)} className="dropdown-tag-close">
                <img src={deleteFile} alt="bla" />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue.label;
  };

  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(
      (option) => option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0,
    );
  };

  return (
    <div className="dropdown-container">
      <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <img src={showMenu ? dropdownclose : dropdown} alt="bla" />
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`dropdown-item ${isSelected(option) && 'selected'}`}>
              <div className="content">
                <img src={option.img} alt="bla" />
                <span>{option.label}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
