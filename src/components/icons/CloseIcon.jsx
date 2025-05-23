export const CloseIcon = ({ position = 'right', onClick }) => {
  return (
    <svg
      className={`brand-close-icon position-${position}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="12"
      height="12"
      viewBox="0,0,256,256">
      <g
        fill="#aaaab1"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none">
        <g transform="scale(5.12,5.12)">
          <path d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"></path>
        </g>
      </g>
    </svg>
  );
};
