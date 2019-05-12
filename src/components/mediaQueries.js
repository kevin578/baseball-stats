import { css } from 'styled-components';

const sizes = {
  smallLaptop: 1180,
  tablet: 1080,
  phone: 600
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export default media;
