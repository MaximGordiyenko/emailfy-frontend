import './styles.css';

export const SectionFour = () => {
  return (
    <div className="section four-container">
      <div className="section-four-row">
        <div className="section-four-column">
          <div className="section-four-images-container" style={{ opacity: 1, transform: "none", willChange: "auto" }}>
            <div className="section-four-images-row-1">
              <div className="section-four-image-wrapper section-four-image-1">
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}>
                  <source src="https://res.cloudinary.com/maxigord/video/upload/v1745332218/Mailfly/Subscrube.mp4" type="video/mp4"/>
                </video>
              </div>
              <div className="section-four-image-wrapper section-four-image-2">
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}>
                  <source src="https://res.cloudinary.com/maxigord/video/upload/v1745332450/Mailfly/AB_gr84eo.mp4" type="video/mp4"/>
                </video>
              </div>
            </div>
            <div className="section-four-images-row-2">
              <div className="section-four-image-wrapper section-four-image-3">
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}>
                  <source src="https://res.cloudinary.com/maxigord/video/upload/v1745332703/Mailfly/A-B-C.mp4" type="video/mp4"/>
                </video>
              </div>
              <div className="section-four-image-wrapper section-four-image-4">
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}>
                  <source src="https://res.cloudinary.com/maxigord/video/upload/v1745332976/Mailfly/Dashboard.mp4" type="video/mp4"/>
                </video>
              </div>
              <div className="section-four-image-wrapper section-four-image-5">
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}>
                  <source src="https://res.cloudinary.com/maxigord/video/upload/v1745252332/Mailfly/Clock.mp4" type="video/mp4"/>
                </video>
              </div>
            </div>
            <div className="section-four-images-row-3">
              <div className="section-four-image-wrapper section-four-image-6">
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}>
                  <source src="https://res.cloudinary.com/maxigord/video/upload/v1745333168/Mailfly/Users.mp4" type="video/mp4"/>
                </video>
              </div>
              <div className="section-four-image-wrapper section-four-image-7">
                <video preload="true" width="100%" height="100%" playsInline="" autoPlay={true} loop={true}>
                  <source src="https://res.cloudinary.com/maxigord/video/upload/v1745252323/Mailfly/Calendar.mp4" type="video/mp4"/>
                </video>
              </div>
            </div>
          </div>
        </div>
        <div className="section-four-column">
          <div className="section-four-content" style={{ opacity: 1, transform: "none", willChange: "auto" }}>
            <div className="label ">
              <img className="label-icon"
                   src="https://res.cloudinary.com/maxigord/image/upload/v1745334510/Mailfly/black-hole_ojipss.svg"
                   alt=""/>
              <span className="label-text">grow stronger</span>
            </div>
            <span className="heading">Dozens of features to expand your marketing toolset</span>
            <div className="section-four-description">
              <span>Discover a diverse range of features that will enable you to evolve your email marketing experience to the next level.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
