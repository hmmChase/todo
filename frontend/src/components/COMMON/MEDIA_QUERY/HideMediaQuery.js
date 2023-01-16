// Not used

// import { FC, ReactNode } from 'react';
import styled, { withTheme } from 'styled-components';

// interface QueryProps {
//   queryType?: 'min-width' | 'max-width';
//   pixelSize?: number;
// }

const Query = styled(BaseContainer)`
  display: flex;
  align-items: center;

  /* @media only screen and (${props => props.queryType}: ${props =>
    props.pixelSize / 16}em) {
    display: none;
  } */
`;

// interface HideMediaQueryProps {
//   above?: string;
//   below?: string;
//   children: ReactNode;
//   theme: { breakpoints: { [key: string]: number } };
// }

// : FC<HideMediaQueryProps>
const HideMediaQuery = props => {
  let { above, below, theme, children } = props;

  if (!above && !below) return children;

  let size = above || below;
  let queryType = above ? 'min-width' : 'max-width';

  const pixelSize = theme.breakpoints[size];

  if (pixelSize === undefined) {
    throw new UnknownTypeException(
      `${size} is not a valid size label.  Valid options are ${JSON.stringify(
        Object.keys(theme.breakpoints)
      )}`
    );
  }

  return (
    <Query {...props} pixelSize={pixelSize} queryType={queryType}>
      {children}
    </Query>
  );
};

const themed = withTheme(HideMediaQuery);

export { themed as HideMediaQuery };
