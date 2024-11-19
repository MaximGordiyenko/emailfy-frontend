import React, { useState } from 'react';
import dropdown from '../../assets/images/dropdownActive.png';
import dropdownblack from '../../assets/images/blackdropdown.png';

const CustomDropdown = ({
  label,
  options,
  isCheckImg,
  onSelect,
  isSelectedItem,
  placeholder,
  viewAll,
  title,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  console.log(selectedOption, 'selected option');

  const handleOptionClick = (option, isViewAll) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
    setIsSelected(true);
    if (isViewAll) {
      setSelectedOption(null);
      console.log('View all clicked!');
    }
  };

  const truncate = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="custom-dropdown">
      {label && <label className="dropdown-label">{label}</label>}
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || <div className={'placeholder'}>{placeholder}</div>}
        <img src={isOpen ? dropdownblack : dropdown} alt={'domain-arrow'} />
      </div>
      {isOpen && (
        <ul className="options">
          {title && <h4 className={'options-title'}>{title}</h4>}
          {options.map((option, i) => (
            <li
              key={i}
              onClick={() => handleOptionClick(option)}
              className={selectedOption === option ? 'selected-option-li' : ''}>
              {truncate(option, 30)}
              {isSelected && selectedOption === option && (
                <img src={isCheckImg} alt={'check-img'} />
              )}
            </li>
          ))}
          {viewAll && (
            <span className={'view-span'} onClick={() => handleOptionClick('View all', true)}>
              View all
            </span>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
