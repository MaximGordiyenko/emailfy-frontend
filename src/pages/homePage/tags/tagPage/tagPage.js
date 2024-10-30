import arrow from '../../../../assets/images/Alt Arrow Down.svg';
import newarrup from '../../../../assets/images/newarrup.svg';
import newarrdown from '../../../../assets/images/newarrdown.svg';
import pencil from '../../../../assets/images/tagEdit.png';
import arrowUp from '../../../../assets/images/greenArrowUp.png';
import search from '../../../../assets/images/search.png';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Modal from './currTagTable/modal';
import TableContact, { UsersTable } from './currTagTable/tagTable';
import { useEffect, useState } from 'react';
import { fieldList, data, changeTags } from '../../../../constants';
import { ColumnFieldSelector } from './fieldSelector/columnFieldSelector';
import { Dropdown } from './dropdownComponent/dropdown';

export const TagPage = () => {
  const [visibleCol, setVisibleCol] = useState([
    fieldList.email,
    fieldList.firstname,
    fieldList.lastname,
    fieldList.addresses,
  ]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [userData, setUserData] = useState(data);
  const [isAddContacts, setIsAddContacts] = useState(false);
  const [searchRow, setSearchRow] = useState('');
  const [isChangeTag, setIsChangeTag] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleRowSelect = (rowId) => {
    console.log(rowId, 'rowId');
    if (selectedRowIds.includes(rowId)) {
      setSelectedRowIds(
        selectedRowIds.filter((item) => {
          return item !== rowId;
        }),
      );
    } else {
      setSelectedRowIds((prev) => [...prev, rowId]);
    }
  };

  const countSelectedRows = selectedRowIds.length - 1;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  // const handleSelect = (checkboxStatus) => {
  //     setIsOpenCountBar(prev => !prev);
  //     setUserData(prevUserData => {
  //         const updatedUserData = prevUserData.map(row => {
  //             return {
  //                 ...row,
  //                 checkbox: checkboxStatus,
  //             };
  //         });
  //
  //         // Calculate the selected rows count
  //         const count = updatedUserData.filter(row => row.checkbox).length;
  //         setSelectedRowCount(count);
  //
  //         return updatedUserData;
  //     });
  // };
  const handleSelect = (checkboxStatus) => {
    console.log('checkbox', checkboxStatus);
    if (checkboxStatus) {
      setSelectedRowIds(Object.keys(data).map((item) => +item));
    } else {
      setSelectedRowIds([]);
    }
    if (selectedRowIds.length) {
      return setIsChangeTag(true);
    }
    // setUserData(prevUserData => {
    //     console.log(userData, "userData")
    //     return prevUserData.map((row, index) => {
    //             return{
    //                 ...row,
    //                 checkbox:checkboxStatus,
    //                 key:index,
    //             }
    //     })}
    // )
  };

  console.log(selectedTag, 'seleted tag');
  console.log(selectedRowIds, 'seleted rowId');

  useEffect(() => {
    if (searchRow) {
      const newData = userData.filter((currentArr) => {
        return Object.values(currentArr).some((arr) =>
          arr.toString().toLowerCase().includes(searchRow.toLowerCase()),
        );
      });
      setUserData(newData); // Update filteredData when there's a search input
    } else {
      setUserData(data); // Reset filteredData to the original data when the search input is empty
    }
  }, [searchRow]);
  // useEffect(() => {
  //     if(searchRow){
  //         let newData = userData.filter(currentArr => {
  //             console.log(currentArr, "currentArr")
  //             return(
  //                 Object.values(currentArr).some(arr => arr.toString().toLowerCase().includes(searchRow.toLowerCase()))
  //             )
  //         })
  //         setUserData(newData)
  //     }
  // }, [searchRow]);
  const handleTagClick = (index) => {
    setSelectedTag(index);
  };
  const handleChangeFields = (newColumns) => {
    setVisibleCol(newColumns);
  };
  const handleChangeSearch = (e) => {
    setSearchRow(e.target.value);
  };
  const handleNavBack = () => {
    navigate('/tags/', { replace: true });
  };
  const handleAddContacts = () => {
    setIsAddContacts((prev) => !prev);
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

  const pathname = window.location.pathname;
  let appId = pathname.split('/')[2];

  return (
    <div className="curr-tag">
      <div className="header">
        <div className="content-box">
          <div className="route-status">
            <div className="manual-routes">
              <span onClick={handleNavBack}>#Tags /</span>
              <p>#{appId}</p>
            </div>
          </div>
          <div className="btns">
            <button className="back" onClick={handleAddContacts}>
              <span>Add contacts</span>
              <img src={isAddContacts ? arrowUp : arrow} alt="greenArrow" />
            </button>
            <button className="back">
              <span>Create new campaign</span>
            </button>
            <button className={'filled'}>
              <span>Save and close</span>
            </button>
          </div>
        </div>
      </div>
      {isAddContacts ? <Dropdown /> : null}
      <div className="tag-box">
        <div className="navigation">
          <div className="nav-title">
            <h1>#{appId}</h1>
            <img src={pencil} alt="pencil" />
          </div>
          <div className="filter-component">
            <span>Tag includes 390 contacts</span>
            <div className="search-input">
              <input
                value={searchRow}
                placeholder="Email, name, address, etc..."
                onChange={handleChangeSearch}
              />
              <img src={search} alt="tag-search" />
            </div>
            <ColumnFieldSelector
              selectedFields={visibleCol}
              handleChangeFields={handleChangeFields}
            />
          </div>
        </div>
        <UsersTable
          columns={visibleCol}
          data={userData}
          handleSelect={handleSelect}
          openModal={openModal}
          handleRowSelect={handleRowSelect}
          selectedRowIds={selectedRowIds}
        />
      </div>
      <div
        className={isChangeTag && selectedRowIds.length ? 'bottom-modal' : 'bottom-modal-hidden'}>
        {renderedChangeTags()}
      </div>
      <div className={selectedRowIds.length ? 'bottom-bar' : 'bottom-bar-hidden'}>
        <div>Selected {selectedRowIds.length} contacts</div>
        <button
          className={'change-tag'}
          onClick={() => {
            setIsChangeTag((prev) => !prev);
          }}>
          <div>Change tag</div>
          <img src={isChangeTag ? newarrup : newarrdown} />
        </button>
      </div>
      <div className={isOpenModal ? 'modal-window' : 'modal-hide'}>a;lmsdad</div>
      {isModalOpen ? <Modal closeModal={closeModal} isOpen={isModalOpen} /> : null}
    </div>
  );
};
