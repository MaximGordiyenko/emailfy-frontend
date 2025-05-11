import { Controller, useFormContext } from 'react-hook-form';
import { Upload, Form, Flex } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { showRequiredLabel } from '../../helpers/ShowRequiredLabel.tsx';
import './styles.css';

const { Dragger } = Upload;
const { Item } = Form;

const DefaultUploaderViewer = ({ label, required, validateStatus, help, tooltip, name, control }) => {
  const { watch, reset } = useFormContext();
  
  const htmlContent = watch('html');
  
  const handleFileRead = (file, onChange) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onChange(content); // Update form state
    };
    reader.readAsText(file);
    return false; // Prevent automatic upload
  };
  
  const contentLabel = () => (
    <Flex justify="space-between">
      {showRequiredLabel(label, required)}
      {htmlContent &&
        <DeleteOutlined
          onClick={() => reset((formValues) => ({
            ...formValues,
            [name]: ''
          }))}
        />
      }
    </Flex>
  );
  
  return (
    <Item
      label={label && contentLabel()}
      validateStatus={validateStatus}
      help={help}
      tooltip={tooltip}
      layout="vertical">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange } }) => (
          <>
            {htmlContent ? (
              <div
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                style={{
                  marginTop: '10px',
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '10px',
                  height: '60vh', // Set the height of the preview container
                  overflow: 'auto', // Enable scrolling for overflowing content
                  backgroundColor: '#f9f9f9'
                }}/>
            ) : (
              <Dragger
                beforeUpload={(file) => handleFileRead(file, onChange)}
                accept=".html"
                multiple={false}
                showUploadList={false}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag an HTML file to this area to upload</p>
                <p className="ant-upload-hint">
                  Only a single HTML file is allowed for preview and processing.
                </p>
              </Dragger>
            )}
          </>
        )}
      />
    </Item>
  );
};

export default DefaultUploaderViewer;
