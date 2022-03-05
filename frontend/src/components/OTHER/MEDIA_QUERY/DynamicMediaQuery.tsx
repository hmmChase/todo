import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  ${({ media, device: size, styles }) => `${media[size]`${styles}`}`};
`;

const DynamicMediaQuery = ({ size, feature, styles, theme, children }) => {
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

DynamicMediaQuery.propTypes = {
  size: PropTypes.string.isRequired,
  feature: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
