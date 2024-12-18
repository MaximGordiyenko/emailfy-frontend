import { useNavigate } from 'react-router-dom';
import { BrandLabel } from '../../../components/inputs/BrandLabel';
import { TextEditor } from '../../../components/editors/TextEditor';
import { PreviewIcon } from './PreviewIcon';
// import { useSelector } from 'react-redux';
import { ROUTE } from '../../../routes/routes.constants';

export const UploadTextForm = ({ control, name, placeholder }) => {
  const navigate = useNavigate();

  // const { campaign_text } = useSelector((state) => state.campaign.data);
  const campaign_text = 'subject of upload';

  const uploadOptionIcon = () => {
    return (
      <>
        {!!campaign_text && (
          <span>
            <PreviewIcon
              className={'campaign-preview-icon'}
              onClick={async () => {
                navigate(`/${ROUTE.campaignsPage}/${ROUTE.textPreview}`);
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
