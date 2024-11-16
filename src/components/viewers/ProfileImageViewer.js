import { LoadingSpinner } from '../loader/LoadingSpinner';
import './styles.css';

export const ProfileImageViewer = ({ profileImage, isLoading, error }) => {
  return (
    <div className="image-container">
      {/* Gradient border container */}
      <div className="gradient-border">
        {/* Inner container for image */}
        <div className="image-wrapper">
          {isLoading && (
            <div className="state-container">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="state-container">
              <span className="error-text">Failed to load</span>
            </div>
          )}

          {!isLoading && !error && profileImage?.AWSImageUrl && (
            <img src={profileImage.AWSImageUrl} alt="Profile" className="profile-image" />
          )}

          {!isLoading && !error && !profileImage?.AWSImageUrl && (
            <div className="state-container">
              <span className="empty-text">No image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
