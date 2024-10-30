const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 1,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    margin: 0,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div className="progress-wrapper">
      <div style={containerStyles} className="parent-prog-bar">
        <div style={fillerStyles} className="child-prog-bar" />
      </div>
    </div>
  );
};

export default ProgressBar;
