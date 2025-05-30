import './styles.css';

export const AppTitle = ({ children, type, padding, margin, color, alignItems }) => {
  const Tag = type || 'p';

  const defaultColor = '--grey-9';
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
