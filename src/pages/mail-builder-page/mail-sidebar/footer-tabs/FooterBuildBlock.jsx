import { DeleteStickyIcon } from '../../../../components/interface/Buttons/DeleteStickyIcon';
import '../styles.css';
import { useContext, useEffect, useState } from 'react';
import { MailBuilderContext } from '../../../../context/MailBuilderContext';
import * as resourceManager from '../../builder-script/resourceManager';
import * as builderTemplate from '../../builder-script/builderTemplate';
import * as builderScript from '../../builder-script/builderScript';

const getTempUrl = async (id) => {
  return await resourceManager.getResourceTempURL(id);
};

export const FooterBuildBlock = ({
  id,
  text,
  style,
  params,
  isActive,
  onClick,
  showMailPreview,
  onClickRemoveBuildBlock,
}) => {
  let isActiveBorderOnHover = !showMailPreview ? ' is-hover-block' : '';
  let isActiveBorderOnClick = isActive && !showMailPreview ? ' is-active-content-border' : '';

  const { mailEditorState, setMailEditorState } = useContext(MailBuilderContext);
  const [state, setState] = useState([]);

  useEffect(() => {
    const processChildren = async () => {
      if (params?.child) {
        const processedData = await Promise.all(
          params.child.map(async (child) => {
            const response = await fetch(child?.icon);
            const blob = await response.blob();
            const file = new File([blob], child?.params?.title, { type: 'image/png' });

            const resourceFileData = await resourceManager.uploadResource(file, child?.id);

            if (child?.params?.resource_id) {
              await resourceManager.removeResource(child?.params?.resource_id);
            }

            const tempUrl = await getTempUrl(resourceFileData.id);

            return {
              id: child?.id,
              resource_id: resourceFileData.id,
              cid: resourceFileData.cid,
              tempUrl: tempUrl,
            };
          }),
        );
        setState(processedData);
        return processedData;

        /*processedData?.forEach((item) => {
          setMailEditorState((prevState) => {
            let newState = [...prevState];
            newState = builderScript.updateBlockById(newState, item?.id, 'resource_id', item.id);
            newState = builderScript.updateBlockById(newState, item?.id, 'cid', item.cid);
            newState = builderScript.updateBlockById(newState, item?.id, 'tempUrl', item?.tempUrl);
            return newState;
          });
        });*/
      }
    };

    processChildren();
  }, [params?.child]);

  useEffect(() => {
    const processData = async () => {
      if (state) {
        state.map(async (child) => {
          setMailEditorState((prevState) => {
            let newState = [...prevState];
            newState = builderScript.updateBlockById(newState, child?.id, 'resource_id', child.id);
            newState = builderScript.updateBlockById(newState, child?.id, 'cid', child.cid);
            newState = builderScript.updateBlockById(
              newState,
              child?.id,
              'tempUrl',
              child?.tempUrl,
            );
            return newState;
          });
        });
      }
    };
    processData();
  });

  console.log(state);

  return (
    <>
      <div
        id={id}
        className={`tag-content${isActiveBorderOnHover}${isActiveBorderOnClick} footer-build-block`}
        style={style}
        onClick={onClick}>
        {params?.child?.map((field) => {
          return (
            <div key={field?.id}>
              <img src={field?.params?.tempUrl} alt="Resource" />
            </div>
          );
        })}
      </div>
      <DeleteStickyIcon
        showMailPreview={showMailPreview}
        isActive={isActive}
        onClick={onClickRemoveBuildBlock}
      />
    </>
  );
};
