import { NextPageWithLayout } from 'next';

import Ideas from '../components/IDEA/Ideas';
import Layout from '../components/LAYOUTS/Layout';

const IndexPage: NextPageWithLayout = () => <Ideas />;

IndexPage.getLayout = function getLayout(page) {
  return (
    <Layout title='Home' description='Home page' hasHeader hasFooter>
      {page}
    </Layout>
  );
};

export async function getServerSideProps(ctx: any) {
  console.log('getServerSideProps req:', ctx.req);
  console.log('getServerSideProps res:', ctx.res);

  return { props: {} };
}

export default IndexPage;
