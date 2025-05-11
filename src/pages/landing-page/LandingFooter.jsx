import './styles.css';

export const LandingFooter = () => {
  return (
    <div className="landing-footer-container">
      <div className="footer-row">
        <div className="footer-column footer-column-1">
          <div className="footer-logo-container">
            <div className="footer-logo-wrapper">
              <img className="footer-logo-image"
                   src="https://res.cloudinary.com/maxigord/image/upload/v1745582121/Mailfly/MailFly_logo.png"
                   alt="footer-logo"
              />
              <span className="footer-logo-text">MailFly</span>
            </div>
            <span className="footer-description-text">
              Efficient email marketing, reimagined and refined for unparalleled performance
            </span>
          </div>
          <div className="footer-copyright-wrapper">
            <div className="footer-made-with-love">
              <span>Made with</span>
              <img
                src="https://res.cloudinary.com/maxigord/image/upload/v1745275686/Mailfly/heart_ymgp7z.svg"
                alt="heart"
              />
              <span>in</span>
              <img
                src="https://res.cloudinary.com/maxigord/image/upload/v1745275864/Mailfly/ua-flag_iuzr05.svg"
                alt="ua-flag"
              />
              <span>Ukraine</span>
            </div>
          </div>
        </div>
        <div className="footer-divider"/>
        <div className="footer-column footer-column-2">
          <div className="footer-form-wrapper">
            <span className="footer-form-title">
            Join the waitlist
            </span>
            <div className="footer-form">
              <input type="text" placeholder="Your Email..." className="footer-input"/>
              <button className="button primary has-icon ">
                <img
                  src="/static/media/add-simple.41b603d6753206c25457d09a295b31c9.svg" alt=""/>
                join
              </button>
            </div>
          </div>
          <div className="footer-links-wrapper">
            <span className="footer-interested">Interested in investing?</span>
            <p className="footer-copyright">©2023-2025 All Rights Reserved</p>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-column footer-column-3">
          <div className="footer-social-wrapper">
            <a href="https://twitter.com"
               target="_blank"
               rel="noreferrer">
              <img
                src="https://res.cloudinary.com/maxigord/image/upload/v1745277447/Mailfly/twitter_ziywkh.svg"
                alt="twitter"
              />
            </a>
            <a href="https://www.linkedin.com/company/Mailfly/" target="_blank" rel="noreferrer">
              <img
                src="https://res.cloudinary.com/maxigord/image/upload/v1745277443/Mailfly/linkedin_imynmy.svg"
                alt="linkedin"/>
            </a>
            <a href="https://www.instagram.com/Mailfly.io" target="_blank" rel="noreferrer">
              <img
                src="https://res.cloudinary.com/maxigord/image/upload/v1745277442/Mailfly/instagram_vgyer5.svg"
                alt="instagram"/>
            </a>
          </div>
          <div className="footer-gdpr-wrapper">
            <img src="https://res.cloudinary.com/maxigord/image/upload/v1745278618/Mailfly/can-spam_e4qbpc.svg"
                 alt="can-spam"
            />
            <img
              src="https://res.cloudinary.com/maxigord/image/upload/v1745278612/Mailfly/gdpr_ee7nov.svg" alt="gdpr"/>
          </div>
        </div>
      </div>
    </div>
  );
};
