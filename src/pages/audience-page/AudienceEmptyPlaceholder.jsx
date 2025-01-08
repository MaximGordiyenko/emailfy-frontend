import audienceListEmpty from '../../assets/images/audienceListEmpty.svg';

export const AudienceEmptyPlaceholder = ({ onClick }) => {
  return (
    <div className="audience-preview">
      <img src={audienceListEmpty} alt="aud" />
      <div className="audience-desc">
        <h3>Build your audience!</h3>
        <p>
          {`Add contacts to your audience to launch an effective campaign. Choose a convenient way to add contacts: import via CSV file, manual adding or import from mailchimp.`}
        </p>
      </div>
      <button onClick={onClick}>
        <span>Add your audience</span>
      </button>
    </div>
  );
};
