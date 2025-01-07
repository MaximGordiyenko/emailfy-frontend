import { SidebarTools } from './mail-sidebar/SidebarTools';
import { MailEditor } from './mail-editor/MailEditor';
import { useContext } from 'react';
import { MailBuilderContext } from '../../context/MailBuilderContext';
import * as builderTemplate from './builder-script/builderTemplate';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { initMobileMediaQuery } from './initial.constants';

export const MailBuilder = () => {
  const { mailEditorState, workspaceWidthRef, setWorkspaceWidth, mediaQuery, showMailPreview } =
    useContext(MailBuilderContext);

  builderTemplate.setEditorType('builder');

  useResizeObserver(workspaceWidthRef?.current, (width) => {
    setWorkspaceWidth(width);
  });

  const isMobileMode =
    showMailPreview && mediaQuery === initMobileMediaQuery ? ' is-mobile-mode' : '';
  console.log(mailEditorState);
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
