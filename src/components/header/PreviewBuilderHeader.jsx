import { useContext, useEffect, useState } from 'react';
import { MailBuilderContext } from '../../context/MailBuilderContext';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { TextIconButton } from '../interface/Buttons/TextIconButton';
import { UnDoIcon } from '../interface/Buttons/UnDoIcon';
import { ReDoIcon } from '../interface/Buttons/ReDoIcon';
import { PreviewIcon } from '../interface/Buttons/PreviewIcon';
import { FileIcon } from '../interface/Buttons/FileIcon';

import * as builderScript from '../../pages/mail-builder-page/builder-script/builderScript';
import * as builderTemplate from '../../pages/mail-builder-page/builder-script/builderTemplate';
import * as testEmail from '../../pages/mail-builder-page/builder-script/testEmail';
import * as resourceManager from '../../pages/mail-builder-page/builder-script/resourceManager';

import plane from '../../assets/images/plane.png';
import './styles.css';
import { renderToStaticMarkup } from 'react-dom/server';
import { RootHtml, MailEditorToHTML } from '../../helpers/TypeResolverComponent';

export const PreviewBuilderHeader = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState(null);
  const [mailSize, setMailSize] = useState({
    resources_size: 0,
    html_size: 0,
  });

  const { mailEditorState, isLoadedScript } = useContext(MailBuilderContext);

  const handleNavBack = () => {
    navigate('/campaigns', { replace: true });
  };
  // console.log(JSON.stringify(mailEditorState, null, 2));

  useEffect(() => {
    if (!isLoadedScript) {
      return;
    }
    const html = builderScript.buildFinalHTML(mailEditorState);
    const newResources = resourceManager.isUpdatedResources(mailEditorState, resources);
    const template_id = localStorage.getItem('current_template_id');
    if ((resources !== null && newResources === null) || !template_id) {
      setMailSize({
        resources_size: mailSize.resources_size,
        html_size: html?.length,
      });
    } else {
      setResources(newResources);
      (async () => {
        await builderTemplate.saveContent({
          content: html,
        });
        const size = await testEmail.getEmailSize();
        setMailSize({
          resources_size: size - html?.length,
          html_size: html?.length,
        });
      })();
    }
  }, [mailEditorState]);

  return (
    <div className="brand-header builder-header preview-header">
      <div className="content-box">
        <div className="route-status">
          <img src={plane} alt="plan" />
          <div className="manual-routes">
            <span onClick={handleNavBack}> Campaigns /</span>
            <span onClick={handleNavBack}> Create new campaign /</span>
            <p>Design email</p>
          </div>
        </div>
        <div className="header-btns-group">
          <div className="undo-redo-group">
            <UnDoIcon onClick={() => {}} />
            <ReDoIcon onClick={() => {}} />
          </div>
          <PreviewIcon
            onClick={() => navigate(`/${ROUTE.mailBuilderPage}/${ROUTE.mailBuilderPreview}`)}
          />
          <TextIconButton
            className={'file-size-btn-icon'}
            onClick={() => {}}
            text={testEmail.displayEmailSize(mailSize.resources_size + mailSize.html_size)}
            icon={<FileIcon />}
          />
          <button
            className={'save-btn'}
            onClick={async () => {
              await builderTemplate.saveScript(mailEditorState);
              const html = builderScript.buildFinalHTML(mailEditorState);
              await builderTemplate.saveContent({
                content: html,
              });
              const size = await testEmail.getEmailSize();
              setMailSize(size);
            }}>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};
