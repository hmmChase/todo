import React from 'react';

const Link = ({ as, href, ...props }) =>
  React.cloneElement(React.Children.only(props.children), { href: as ?? href });

export default Link;
