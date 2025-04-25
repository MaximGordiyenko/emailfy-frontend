import './styles.css';

export const ScrolledQuotes = ({ title, children, bg }) => {
  return (
    <div className="scroll-pagination-item">
      <div className="scroll-pagination-progress" style={{ background: bg }}>
        <div className="scroll-pagination-progress-filled" />
      </div>
      <span className="scroll-pagination-title" style={{ color: bg }}>
        {title}
      </span>
      <span
        className="scroll-pagination-description">
         {children}
        </span>
    </div>
  );
};
