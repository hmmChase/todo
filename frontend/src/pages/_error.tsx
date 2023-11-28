import Link from 'next/link';

// https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing

const LinkHome = () => (
  <Link href='/' passHref>
    <button>Home</button>
  </Link>
);

interface ErrorProps {
  statusCode: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>

      <LinkHome />
    </>
  );
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode: number = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
