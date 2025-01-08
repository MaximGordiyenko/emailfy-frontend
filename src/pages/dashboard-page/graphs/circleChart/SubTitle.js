import React from 'react';

const SubTitle = ({ radius, fill, textAnchor, subTitle1, subTitle2, currency }) => {
  return (
    <text x={radius} y={radius} fill={fill} textAnchor={textAnchor}>
      <tspan style={{ fontFamily: 'MacPawFixelBold', fontSize: '20px', width: '100px' }}>
        {subTitle1}
      </tspan>
    </text>
  );
};

export default SubTitle;
