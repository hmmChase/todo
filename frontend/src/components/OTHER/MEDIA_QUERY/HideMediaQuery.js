import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { UnknownTypeException } from '../Exception';
import { BaseContainer } from '../_elements';
import { Types } from '../../types';

const Query = styled(BaseContainer)`
  display: flex;
  align-items: center;

  @media only screen and (${props => props.queryType}: ${props =>
      props.pixelSize / 16}em) {
    display: none;
  }
`;

Query.propTypes = {
  queryType: PropTypes.oneOf(['min-width', 'max-width']),
  pixelSize: PropTypes.number
};

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

HideMediaQuery.propTypes = {
  above: PropTypes.string,
  below: PropTypes.string,
  children: PropTypes.node.isRequired,
  theme: Types.theme.isRequired
};
