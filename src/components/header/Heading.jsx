export default function Heading({ children, className, ...props }) {
  return (
    <span className={`heading ${className ?? ''}`} {...props}>
      {children}
    </span>
  );
}
