export const ButtonOfPlayer = () => {
  const buttonStyle = {
    width: '50px',
    height: '50px',
    border: '3px solid #fff',
    background: '#fff',
    borderRadius: '100%',
  };

  const pseudoElementStyle = {
    borderTop: '15px solid transparent',
    borderLeft: '20px solid #000',
    borderBottom: '15px solid transparent',
    marginTop: '11px',
    marginLeft: '18px',
  };

  return (
    <div className="button-of-player" style={buttonStyle}>
      <div style={pseudoElementStyle}></div>
    </div>
  );
};
