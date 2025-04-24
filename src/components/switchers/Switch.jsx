export default function Switch({ className, enabled, onChange, ...props }) {
  return (
    <div className={`switch ${className ?? ''}${enabled ? ' active' : ''}`} {...props}>
      <div className="switch-button" onClick={onChange} />
    </div>
  );
}
