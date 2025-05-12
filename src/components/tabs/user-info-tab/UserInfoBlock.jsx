import { Button, Flex, Descriptions } from 'antd';
import { ProfileImageUploader } from '../../uploaders/ProfileImageUploader';
import './styles.css';

export const UserInfoBlock = ({
  uploadImage,
  profileImage,
  isProfileImageLoading,
  itemsDescriptions,
}) => {
  return (
    <Flex gap={100} justify={`space-around`} align={`center`} rootClassName="user-info-block">
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
