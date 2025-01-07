import { useContext, useEffect, useState } from 'react';
import { initialTabs } from './tabs.constants';
import { TextIconWrapper } from '../../../components/wrappers/TextIconWrapper';
import { Title } from '../../../components/interface/Title/Title';
import { RoundCloseIcon } from '../../../components/icons/RoundCloseIcon';
import './styles.css';
import * as builderTemplate from '../builder-script/builderTemplate';
import { MailBuilderContext } from '../../../context/MailBuilderContext';

export const SidebarTools = () => {
  const { activeTab, setActiveTab, selectedMailEditorBlock, setSelectedBlockID } =
    useContext(MailBuilderContext);

  const [templateName, setTemplateName] = useState('...');

  useEffect(() => {
    builderTemplate.getName().then((name) => setTemplateName(name));
  }, []);

  useEffect(() => {
    if (initialTabs.hasOwnProperty(selectedMailEditorBlock.tabs)) {
      const firstTabName = initialTabs[selectedMailEditorBlock.tabs][0].name;
      setActiveTab(firstTabName);
    } else {
      setActiveTab('build-blocks-tab');
    }
  }, [selectedMailEditorBlock.tabs, setActiveTab]);

  const renderTabWithContent = (selectedTab, initData) => {
    if (initData.hasOwnProperty(selectedMailEditorBlock.tabs)) {
      const selectedTabs = initData[selectedMailEditorBlock.tabs].map((tab) => (
        <li
          key={tab.id}
          className={`tab${tab.name === activeTab ? ' is-active' : ''}`}
          onClick={() => setActiveTab(tab.name)}>
          {tab.label}
        </li>
      ));

      const selectedContext = initData[selectedMailEditorBlock.tabs].find(
        (tab) => tab.name === selectedTab,
      )?.content;

      return (
        <>
          <ul className="tab-list">{selectedTabs}</ul>
          {(activeTab === 'build-blocks-tab' || activeTab === 'layout-blocks-tab') && (
            <Title type="h5" alignItems="center" color="--default-green-bg">
              Drag and drop element
            </Title>
          )}
          <div className="tab-content">{selectedContext}</div>
        </>
      );
    }

    const blocksTabs = initData.blocksTabs.map((tab) => (
      <li
        key={tab.id}
        className={`tab${tab.name === activeTab ? ' is-active' : ''}`}
        onClick={() => setActiveTab(tab.name)}>
        {tab.label}
      </li>
    ));

    const selectedContextInBlocksTabs = initData.blocksTabs.find(
      (tab) => tab.name === selectedTab,
    )?.content;

    return (
      <>
        <ul className="tab-list">{blocksTabs}</ul>
        {(activeTab === 'build-blocks-tab' || activeTab === 'layout-blocks-tab') && (
          <Title type="h5" alignItems="center" color="--default-green-bg">
            Drag and drop element
          </Title>
        )}
        <div className="tab-content">{selectedContextInBlocksTabs}</div>
      </>
    );
  };

  return (
    <div className="tabs-container">
      {selectedMailEditorBlock?.title ? (
        <TextIconWrapper className="title-wrapper">
          <Title type="h2">{selectedMailEditorBlock?.title}</Title>
          {selectedMailEditorBlock && <RoundCloseIcon onClick={() => setSelectedBlockID(null)} />}
        </TextIconWrapper>
      ) : (
        <Title type="h2" margin="15px 0 0 35px">
          Test Campaign
        </Title>
      )}
      {renderTabWithContent(activeTab, initialTabs)}
    </div>
  );
};
