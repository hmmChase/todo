import { NextPageWithLayout } from 'next';

import IdeasPageOffset from '@/components/IDEA/IdeasPageOffset';
import Layout from '@/components/LAYOUTS/Layout';

const IndexPage: NextPageWithLayout = () => <IdeasPageOffset />;

IndexPage.getLayout = function getLayout(page) {
  return (
    <Layout title='Home' description='Home page' hasHeader hasFooter>
      {page}
    </Layout>
  );
};

// export const getServerSideProps = (ctx: any) => {
//   // console.log('getServerSideProps req:', Object.keys(ctx.req));
//   // console.log('getServerSideProps headers:', Object.keys(ctx.req.headers));

//   return { props: {} };
// };

export default IndexPage;
