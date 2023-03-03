import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { PropsWithChildren, ReactNode } from 'react';

// https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.tsx

type ActiveLinkProps = LinkProps & {
  activeClassName: string;
  children: ReactNode;
  className?: string;
};

const ActiveLink = ({
  activeClassName,
  children,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath, isReady } = useRouter();

  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${className} ${activeClassName}`.trim()
          : className;

      if (newClassName !== computedClassName)
        setComputedClassName(newClassName);
    }
  }, [
    activeClassName,
    asPath,
    className,
    computedClassName,
    isReady,
    props.as,
    props.href
  ]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
