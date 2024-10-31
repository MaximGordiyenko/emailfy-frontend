import { useContext } from 'react';
import { PreviewBuilderHeader } from '../../components/header/PreviewBuilderHeader';
import { SidebarTools } from './mail-sidebar/SidebarTools';
import { MailEditor } from './mail-editor/MailEditor';
import { initMobileMediaQuery } from './initial.constants';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import * as builderTemplate from './builder-script/builderTemplate';
import { MailBuilderContext } from '../../context/MailBuilderContext';
import './styles.css';

export const MailBuilderPage = () => {
  const { workspaceWidthRef, setWorkspaceWidth, mediaQuery, showMailPreview } =
    useContext(MailBuilderContext);

  builderTemplate.setEditorType('builder');

  useResizeObserver(workspaceWidthRef.current, (width) => {
    setWorkspaceWidth(width);
  });

  const isMobileMode =
    showMailPreview && mediaQuery === initMobileMediaQuery ? ' is-mobile-mode' : '';

  return (
    <div className="workspace-container">
      <div className="workspace-tools">
        <SidebarTools />
      </div>
      <div className={`workspace-editor${isMobileMode}`} ref={workspaceWidthRef}>
        <MailEditor />
      </div>
    </div>
  );
};
