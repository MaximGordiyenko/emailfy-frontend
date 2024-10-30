import { useNavigate } from 'react-router-dom';
import { BrandLabel } from '../../../../components/inputComponent/BrandLabel';
import { TextEditor } from '../../../../components/editors/TextEditor';
import { PreviewIcon } from './PreviewIcon';
import { useSelector } from 'react-redux';

export const UploadTextForm = ({ control, name, placeholder }) => {
  const navigate = useNavigate();

  const { campaign_text } = useSelector((state) => state.campaign.data);

  const uploadOptionIcon = () => {
    return (
      <>
        {!!campaign_text && (
          <span>
            <PreviewIcon
              className={'campaign-preview-icon'}
              onClick={async () => {
                navigate('/campaigns/create/text/preview');
              }}
            />
          </span>
        )}
      </>
    );
  };

  return (
    <div className="campaign-upload_html-form">
      <div className="brand-input-icon-block">
        <div className="brand-input-icon-block">
          <BrandLabel label="Email" required={true} labelInfo={uploadOptionIcon()} />
        </div>
        <TextEditor control={control} name={name} placeholder={placeholder} />
      </div>
    </div>
  );
};
