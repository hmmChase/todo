import { FC, ReactNode } from 'react';
import styled, { css, withTheme } from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  ${({ media, device: size, styles }) => `${media[size]`${styles}`}`};
`;

interface Props {
  size: string;
  feature: string;
  styles: string;
  theme: { breakpoints: { [key: string]: number } };
  children: ReactNode;
}

const DynamicMediaQuery: FC<Props> = props => {
  const { size, feature, styles, theme, children } = props;

  /**
   * Generate media template
   * Ref: https://www.styled-components.com/docs/advanced#media-templates
   */

  const mediaQueries = Object.keys(theme.breakpoints).reduce(
    (accumulator, breakpointName) => {
      accumulator[breakpointName] = (...args) =>
        css`
          @media (${feature}: ${theme.breakpoints[breakpointName] / 16}em) {
            ${css(...args)}
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
