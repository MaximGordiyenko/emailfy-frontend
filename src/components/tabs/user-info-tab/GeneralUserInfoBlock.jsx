import { Button, Flex, Descriptions } from 'antd';
import { ProfileImageUploader } from '../../drag-n-drop-uploader/ProfileImageUploader';

export const GeneralUserInfoBlock = ({
  uploadImage,
  profileImage,
  isProfileImageLoading,
  itemsDescriptions,
}) => {
  return (
    <Flex gap={100} justify={`space-around`} align={`center`}>
      <ProfileImageUploader
        uploadImage={uploadImage}
        profileImage={profileImage}
        isLoadingProfileImage={isProfileImageLoading}
      />
      <Descriptions
        title="General User Information"
        size={`default`}
        extra={<Button type="primary">Edit</Button>}
        items={itemsDescriptions}
      />
    </Flex>
  );
};
