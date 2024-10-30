import { Link } from 'react-router-dom';

export const FaceBookIcon = ({ onClick, background, color, to }) => {
  return (
    <Link to={to} target="_blank">
      <svg
        cursor="pointer"
        width="30"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}>
        <g clipPath="url(#clip0_16731_62608)">
          <path
            d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z"
            fill={color}
          />
          <path
            d="M24.8772 9.60352H21.5543C19.5824 9.60352 17.3891 10.4329 17.3891 13.2912C17.3988 14.2872 17.3891 15.241 17.3891 16.3145H15.1079V19.9446H17.4597V30.395H21.7813V19.8756H24.6337L24.8918 16.3043H21.7068C21.7068 16.3043 21.714 14.7156 21.7068 14.2543C21.7068 13.1247 22.8822 13.1894 22.9529 13.1894C23.5122 13.1894 24.5997 13.191 24.8788 13.1894V9.60352H24.8772Z"
            fill={background}
          />
        </g>
        <defs>
          <clipPath id="clip0_16731_62608">
            <rect width="30" height="30" fill="white" transform="translate(5 5)" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
};
