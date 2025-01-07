import { createContext, useState, useRef, useEffect } from 'react';
import * as builderScript from '../pages/mail-builder-page/builder-script/builderScript';
import * as builderTemplate from '../pages/mail-builder-page/builder-script/builderTemplate';

export const MailBuilderContext = createContext({
  mailEditorState: null,
  setMailEditorState: () => {},
});

export const MailBuilderProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('build-blocks-tab');
  const [mailEditorState, setMailEditorState] = useState([]);
  const [isLoadedScript, setIsLoadedScript] = useState(false);
  const [selectedBlockID, setSelectedBlockID] = useState(null);
  const [workspaceWidth, setWorkspaceWidth] = useState();
  const workspaceWidthRef = useRef(null);
  const [showMailPreview, setShowMailPreview] = useState(false);
  const [mediaQuery, setMediaQuery] = useState('33%');
  const [backgroundColor, setBackgroundColor] = useState('#7E9D00');

  useEffect(() => {
    if (mailEditorState.length) return;
    (async () => {
      builderTemplate.loadScript().then((script) => {
        setIsLoadedScript(true);
        setMailEditorState((_) => script);
      });
    })();
  }, []);

  const selectedMailEditorBlock =
    builderScript?.findBlockById(mailEditorState, selectedBlockID) || {};

  const values = {
    activeTab,
    setActiveTab,
    mailEditorState,
    setMailEditorState,
    isLoadedScript,
    setIsLoadedScript,
    selectedBlockID,
    setSelectedBlockID,
    selectedMailEditorBlock,
    workspaceWidth,
    setWorkspaceWidth,
    showMailPreview,
    setShowMailPreview,
    mediaQuery,
    setMediaQuery,
    backgroundColor,
    setBackgroundColor,
    workspaceWidthRef,
  };

  return <MailBuilderContext.Provider value={values}>{children}</MailBuilderContext.Provider>;
};
