import './styles.css';

export const Title = ({ children, type, padding, margin, color, alignItems }) => {
  const Tag = type || 'p';

  const defaultColor = '--default-grey-90';
  const style = {
    alignItems: alignItems || 'flex-start',
    padding: padding || 0,
    margin: margin || 0,
    color: color ? `var(${color})` : `var(${defaultColor})`,
  };

  return (
    <Tag style={style} className="title">
      {children}
    </Tag>
  );
};
