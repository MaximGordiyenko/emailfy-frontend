import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReactSortable } from 'react-sortablejs';
import { Accordion } from '../../../../components/accordion/Accordion';

import TextSquare from '../../../../assets/footer/TextSquare.svg';
import ChatRoundLike from '../../../../assets/footer/ChatRoundLike.svg';
import UserMinusRounded from '../../../../assets/footer/UserMinusRounded.svg';

import { MailBuilderContext } from '../../../../context/MailBuilderContext';

import * as resourceManager from '../../builder-script/resourceManager';
import * as builderScript from '../../builder-script/builderScript';
import { IconUploader } from '../../../../components/uploaders/IconUploader';

export const FooterEditor = () => {
  const { mailEditorState, setMailEditorState, selectedBlockID, selectedMailEditorBlock } =
    useContext(MailBuilderContext);

  const myBlock = builderScript.findBlockById(mailEditorState, selectedBlockID);

  const updateSocialField = (iconId, resourceId, url) => {
    setMailEditorState((prevState) => {
      return prevState.map((block) => {
        if (block.id === selectedBlockID) {
          return {
            ...block,
            params: {
              ...block.params,
              child: block.params.child.map((item) =>
                item.id === iconId ? { ...item, resource_id: resourceId, link: url } : item,
              ),
            },
          };
        }
        return block;
      });
    });
  };

  const handleUrlChange = (iconId) => async (event) => {
    const newUrl = event.target.value;
    const resourceId = selectedMailEditorBlock?.params?.child.find(
      (item) => item.id === iconId,
    )?.resource_id;
    // console.log({ resourceId });
    // if (resourceId) {
    //   const tempUrl = await getTempUrl(resourceId);
    //   updateSocialField(iconId, resourceId, tempUrl || newUrl);
    // } else {
    //   updateSocialField(iconId, null, newUrl);
    // }
  };

  return (
    <div className="tab-editor-container">
      <Accordion icon={ChatRoundLike} title="Social media">
        <ReactSortable
          list={myBlock?.params?.child}
          setList={() => {}}
          clone={(item) => ({ ...item, id: uuidv4() })}
          animation={200}
          group={{
            name: 'footer-social-icon',
            pull: false,
            put: false,
          }}
          className="footer-socials-icon-container">
          {myBlock?.params?.child?.map((field) => {
            console.log(`%c FE params child:`, `color: #f0c60a`, field);
            return (
              <div key={field?.id}>
                <Typography>{field?.params?.title}</Typography>
                <div className="footer-icon-input-block" style={{ display: 'flex' }}>
                  {field?.params?.tempUrl ? (
                    <img src={field?.params?.tempUrl} alt="Resource" style={{ width: '100px' }} />
                  ) : (
                    <IconUploader id={field?.id}>{field?.icon}</IconUploader>
                  )}
                  <input
                    placeholder="Enter url"
                    value={field?.link || ''}
                    onChange={handleUrlChange(field?.id)}
                  />
                </div>
              </div>
            );
          })}
        </ReactSortable>
      </Accordion>
      <Accordion icon={UserMinusRounded} title="Unsubscribe text" />
      <Accordion icon={TextSquare} title="Additional text" />
    </div>
  );
};
