import './style.scss';
import addSquare from '../../../../assets/images/addSquare.svg';
import usersGroupRounded from '../../../../assets/images/usersGroupRounded.svg';
import pieChart from '../../../../assets/images/pieChart2.svg';
import pen from '../../../../assets/images/pen.svg';
import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../components/modals/Modal';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import * as groupApi from '../../../../api/subscribes/groups';
import { getToken } from '../../../../api/API';

const mockDate = format(new Date(2024, 0, 26), 'MMM d, yyyy');
const generateNewDate = () => format(new Date(Date.now()), 'MMM d, yyyy');

let groupsList = [];

export const AudienceList = () => {
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [list, setList] = useState([
    {
      id: uuidv4(),
      name: 'Core list',
      contacts: '...',
      segments: '...',
      created: '...',
      modified: '...',
    },
  ]);
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      const access_token = getToken('accessToken');
      const rootGroup = (await groupApi.get_root(access_token)).data;
      const groups = (await groupApi.get_subgroups(access_token, rootGroup.id)).data;
      const core_users_count = (await groupApi.get_subscribers_count(access_token, rootGroup.id))
        .data.count;

      groupsList = [
        {
          id: uuidv4(),
          name: 'Core list',
          contacts: core_users_count,
          segments: groups.length,
          created: format(new Date(rootGroup.created_at), 'MMM d, yyyy'),
          modified: format(new Date(rootGroup.updated_at), 'MMM d, yyyy'),
        },
      ];

      for (let group of groups) {
        groupsList.push({
          id: group.id,
          name: group.name,
          contacts: '...',
          segments: '...',
          created: format(new Date(group.created_at), 'MMM d, yyyy'),
          modified: format(new Date(group.updated_at), 'MMM d, yyyy'),
        });
      }
      setList([...groupsList]);

      for (let group of groups) {
        const subscribers_count = (await groupApi.get_subscribers_count(access_token, group.id))
          .data.count;
        const subgroups = (await groupApi.get_subgroups(access_token, group.id)).data;
        groupsList = groupsList.map((item) => {
          if (item.id === group.id) {
            return {
              ...item,
              contacts: subscribers_count,
              segments: subgroups.length,
            };
          }
          return item;
        });
        setList([...groupsList]);
      }
    })().then();
  }, []);

  const onCreateNewGroup = async () => {
    toggleCreateModal();
    const access_token = getToken('accessToken');
    const rootGroup = (await groupApi.get_root(access_token)).data;
    const groups = (await groupApi.create(access_token, rootGroup.id, 'icon', name)).data;
    console.log('created a new group', groups);
    groupsList.push({
      id: groups.id,
      name: groups.name,
      contacts: 0,
      segments: 0,
      created: format(new Date(groups.created_at), 'MMM d, yyyy'),
      modified: format(new Date(groups.updated_at), 'MMM d, yyyy'),
    });
    setList([...groupsList]);
  };

  const toggleCreateModal = async () => {
    setName('');
    setCreateModal(!createModal);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const openEditModal = (name) => () => {
    setEditModal(true);
  };

  const onChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const onCreate = () => {
    setList((prevState) => {
      return [
        ...prevState,
        {
          id: uuidv4(),
          contacts: 0,
          segments: 0,
          created: generateNewDate(),
          modified: generateNewDate(),
          name,
        },
      ];
    });
    setName('');
    toggleCreateModal();
  };
  const onEdit = (id, name) => {
    setList((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return { ...item, name, modified: generateNewDate() };
        }
        return item;
      });
    });
  };

  return (
    <>
      <div className="audience-list">
        {list.map((item) => {
          return (
            <AudienceListItem
              key={item.id}
              item={item}
              modal={editModal}
              openModal={openEditModal(item.name)}
              closeModal={closeEditModal}
              onEdit={onEdit}
            />
          );
        })}
        <div className="audience-add-new-list" onClick={toggleCreateModal}>
          <img src={addSquare} alt="" />
          <span>Add new list</span>
        </div>
      </div>
      <Modal isOpen={createModal}>
        <div className="audience-list-modal-content">
          <div className="audience-list-modal-header">
            <span>Create new list</span>
          </div>
          <div className="audience-list-modal-body">
            <span>List name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter list name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="audience-list-modal-buttons">
            <button onClick={toggleCreateModal} className="cancel-btn">
              <span>Cancel</span>
            </button>
            <button className="save-btn" onClick={onCreateNewGroup}>
              <span>Create</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const AudienceListItem = ({ item, modal, openModal, closeModal, onEdit }) => {
  const { id, name, contacts, segments, created, modified } = item;

  const [newName, setNewName] = useState(name);

  const onChange = (event) => {
    const value = event.target.value;
    console.log({ target: event.target });
    setNewName(value);
  };

  const onOpen = () => {
    setNewName(name);
    openModal();
  };

  const onClose = () => {
    setNewName('');
    closeModal();
  };

  const onSave = () => {
    onEdit(id, newName);
    onClose();
  };

  return (
    <>
      <div className="audience-list-item">
        <div className="audience-list-item_title">
          <span>{name}</span>
          <img src={pen} alt="" onClick={onOpen} />
        </div>
        <div className="audience-list-item_stats">
          <div className="audience-list-item_stats__item">
            <img src={usersGroupRounded} alt="" />
            <span>{contacts}</span>
          </div>
          <div className="audience-list-item_stats__item">
            <img src={pieChart} alt="" />
            <span>{segments}</span>
          </div>
        </div>
        <div className="audience-list-item_date">
          <span>
            Created: <strong>{created}</strong>
          </span>
        </div>
        <div className="audience-list-item_date">
          <span>
            Edited: <strong>{modified}</strong>
          </span>
        </div>
      </div>
      <Modal isOpen={modal}>
        <div className="audience-list-modal-content">
          <div className="audience-list-modal-header">
            <span>Edit list name</span>
          </div>
          <div className="audience-list-modal-body">
            <span>List name</span>
            <input type="text" name="name" value={newName} onChange={onChange} />
          </div>
          <div className="audience-list-modal-buttons">
            <button onClick={onClose} className="cancel-btn">
              <span>Cancel</span>
            </button>
            <button className="save-btn" onClick={onSave}>
              <span>Save</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
