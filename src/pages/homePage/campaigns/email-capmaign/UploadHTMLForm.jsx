import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PreviewIcon } from './PreviewIcon';
import { DeleteIcon } from './DeleteIcon';
import { BrandUploader } from '../../../../components/drag-n-drop-uploader/BrandUploader';
import { BrandLabel } from '../../../../components/inputComponent/BrandLabel';
import { updateField } from '../../../../store/campaignSlice';
import './style.css';

export const UploadHtmlForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { html } = useSelector((state) => state.campaign.data);

  const uploadOptionIcon = () => {
    return (
      <>
        {!!html && (
          <span>
            <PreviewIcon
              className={'campaign-preview-icon'}
              onClick={() => navigate('/campaigns/create/html/preview')}
            />
            <DeleteIcon
              className={`campaign-delete-icon`}
              onClick={() => dispatch(updateField({ field: 'html', value: '' }))}
            />
          </span>
        )}
      </>
    );
  };

  return (
    <div className="campaign-upload_html-form">
      <div className="brand-input-icon-block">
        <BrandLabel label="Email" required={true} labelInfo={uploadOptionIcon()} />
      </div>
      <BrandUploader />
    </div>
  );
};
