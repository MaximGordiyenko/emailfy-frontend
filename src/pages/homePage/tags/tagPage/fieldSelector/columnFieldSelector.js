import { useState } from 'react';
import React from 'react';
import tuning from '../../../../../assets/images/tuningTag.png';
import search from '../../../../../assets/images/search.png';
import { fieldList, permanentFields } from '../../../../../constants';
import { difference } from 'lodash';
import './style.scss';

export const ColumnFieldSelector = ({ selectedFields, handleChangeFields }) => {
  const [visibleFields, setVisibleFields] = useState(selectedFields);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };
  const handleToggleCheckbox = (value) => {
    if (visibleFields.includes(value)) {
      setVisibleFields(
        visibleFields.filter((item) => {
          return item !== value;
        }),
      );
    } else {
      setVisibleFields((prev) => [...prev, value]);
    }
  };
  const handleApply = () => {
    handleChangeFields(visibleFields);
    console.log(visibleFields, 'hadleChange visible fields');
    setIsOpen(false);
  };
  const handleResetOptions = () => {
    setVisibleFields(selectedFields);
  };
  const renderOptions = () => {
    let hiddenOptions = difference(Object.keys(fieldList), visibleFields);
    let visibleOptions = difference(Object.keys(fieldList), hiddenOptions);
    if (searchInput) {
      hiddenOptions = hiddenOptions.filter((row) => {
        return row.toLowerCase().includes(searchInput.toLowerCase());
      });
    }
    return (
      <div className={'checkbox-types'}>
        <div className={'visible'}>
          <h1>Visible</h1>
          <div className={'inputs'}>
            {visibleOptions.map((item, i) => {
              return (
                <label key={i}>
                  <input
                    type={'checkbox'}
                    checked={true}
                    onChange={() => handleToggleCheckbox(item)}
                    disabled={!!permanentFields[item]}
                    className={'custom-modal-checkbox'}
                  />
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div className={'hidden'}>
          <h1>Hidden</h1>
          <div className={'inputs'}>
            {hiddenOptions.map((item, i) => {
              return (
                <label key={i}>
                  <input
                    onChange={() => handleToggleCheckbox(item)}
                    type={'checkbox'}
                    checked={false}
                    className={'custom-modal-checkbox'}
                  />
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const toggleModal = () => {
    setIsOpen((isOpenState) => !isOpenState);
  };
  return (
    <div className={'table-modal'}>
      <img src={tuning} alt="tag-tune" className="tune" onClick={toggleModal} />
      <div className={'modal-container'}>
        <div className={isOpen ? 'filter-modal' : 'filter-modal-hide'}>
          <div className={'search-box'}>
            <input value={searchInput} onChange={handleChangeSearch} placeholder={'Search'} />
            <img src={search} alt={'modal-search'} />
          </div>
          {renderOptions()}
          <div className={'bottom-btns'}>
            <button className={'filled'} onClick={handleApply}>
              <span>Apply</span>
            </button>
            <button
              className={'transparent'}
              onClick={() => {
                setIsOpen(false);
              }}>
              <span>Cancel</span>
            </button>
            <button className={'void'} onClick={handleResetOptions}>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
