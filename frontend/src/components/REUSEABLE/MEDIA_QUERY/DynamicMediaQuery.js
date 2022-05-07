// Not used

// import { FC, ReactNode } from 'react';
import styled, { css, withTheme } from 'styled-components';

// interface Props {
//   children: ReactNode;
//   feature: string;
//   size: string;
//   styles: string;
//   theme: { breakpoints: { [key: string]: number } };
// }

// : FC<Props>
const DynamicMediaQuery = ({ children, feature, size, styles, theme }) => {
  const mediaQueries = Object.keys(theme.breakpoints).reduce(
    (accumulator, breakpointName) => {
      accumulator[breakpointName] = (...args) =>
        css`
          ${
            '' /* @media (${feature}: ${theme.breakpoints[breakpointName] / 16}em) {
            ${css(...args)}
          } */
          }
        `.join('');

      return accumulator;
    },
    {}
  );

  return (
    <Wrapper media={mediaQueries} size={size} styles={styles}>
      {children}
    </Wrapper>
  );
};

const themedQuery = withTheme(DynamicMediaQuery);

export { themedQuery as DynamicMediaQuery };

const Wrapper = styled.div`
  display: flex;

  ${({ device: size, media, styles }) => `${media[size]`${styles}`}`};
`;
