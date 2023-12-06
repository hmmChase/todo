import { default as Linkk } from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href: string;
}

const Link = ({ children, href }: Props) => (
  <Linkk href={href} passHref>
    {children}
  </Linkk>
);

export default Link;
