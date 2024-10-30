import './style.scss';
export const StatCard = ({ title, description, value, width }) => {
  return (
    <div className={'stat-card'}>
      <span>{title}</span>
      <div className={'stat-value'}>
        <span className={'value'}>{value}</span>
        <p>{description}</p>
      </div>
    </div>
  );
};
