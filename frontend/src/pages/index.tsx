import { NextPageWithLayout } from 'next';

import App from '@/components/LAYOUTS/App/App';
import IdeasPageOffset from '@/components/IDEA/IdeasPageOffset/IdeasPageOffset';

const IndexPage: NextPageWithLayout = () => <IdeasPageOffset />;

IndexPage.getLayout = function getLayout(page) {
  return (
    <App title='Home' description='Home page' hasHeader hasFooter>
      {page}
    </App>
  );
};

// export const getServerSideProps = (ctx: any) => {
//   // console.log('getServerSideProps req:', Object.keys(ctx.req));
//   // console.log('getServerSideProps headers:', Object.keys(ctx.req.headers));

//   return { props: {} };
// };

export default IndexPage;
