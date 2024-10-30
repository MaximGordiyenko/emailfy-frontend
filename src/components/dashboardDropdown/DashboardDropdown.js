import React, { useState } from 'react';
import dropdown from '../../assets/images/dropdownActive.png';
import dropdownblack from '../../assets/images/blackdropdown.png';
import calendar from '../../assets/images/Dashboard/Linear/Time/Calendar.svg';
const DashboardDropdown = ({ label, options, onSelect, isSelectedItem, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
    setIsSelected(true);
  };

  return (
    <div className="custom-dropdown">
      <label className="dropdown-label">{label}</label>
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        <div className={'main-content'}>
          <img src={calendar} alt={'calendar'} />
          {!selectedOption ? (
            placeholder
          ) : (
            <div className={'selected'}>
              <span>period</span>
              <p>{selectedOption}</p>
            </div>
          )}
        </div>
        <img
          src={isOpen ? dropdownblack : dropdown}
          alt={'domain-arrow'}
          className={'dropdown-arrow'}
        />
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option) => (
            <div key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardDropdown;
