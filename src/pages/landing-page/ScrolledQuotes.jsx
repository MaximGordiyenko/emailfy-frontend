export const ScrolledQuotes = ({ title, children, bg }) => {
  return (
    <div className="slider-pagination-item">
      <div className="slider-pagination-progress" style={{ background: bg }}>
        <div className="slider-pagination-progress-filled"></div>
      </div>
      <span className="slider-pagination-title" style={{ color: bg }}>
        {title}
      </span>
      <span
        className="slider-pagination-description">
         {children}
        </span>
    </div>
  );
};
