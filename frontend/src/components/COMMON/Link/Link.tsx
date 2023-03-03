import { default as Linkk } from 'next/link';
import type { FC, ReactNode } from 'react';

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
