import { FC, ReactNode } from 'react';
import { default as Linkk } from 'next/link';

interface Props {
  children: ReactNode;
  href: string;
}

const Link: FC<Props> = ({ children, href }) => (
  <Linkk href={href} passHref>
    {children}
  </Linkk>
);

export default Link;
