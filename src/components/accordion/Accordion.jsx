import { useState } from 'react';
import './styles.css';

export const Accordion = ({ icon, title, children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="accordion-wrapper">
      <div className={`accordion-title ${isOpen ? 'open' : ''}`} onClick={() => setOpen(!isOpen)}>
        <div className="accordion-title-left">
          <img src={icon} alt={title} />
          <p>{title}</p>
        </div>
      </div>
      <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};
