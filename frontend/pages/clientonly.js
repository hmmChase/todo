import withApollo from '../graphql/withApollo';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ClientOnlyPage = () => (
  <Layout
    title='Client Only'
    header={<Header title='Client Only' />}
    content={
      <>
        <div>
          This example shows how to disable apollos query fetching on the
          server. If you
          <a href='/client-only'> reload </a>
          this page, you will see a loader since Apollo didnt fetch any data on
          the server. This allows
          <a href='https://nextjs.org/blog/next-9#automatic-static-optimization'>
            automatic static optimization
          </a>
          <p>
            It does not create an Apollo Client, and breaks every other SSR
            page.
          </p>
        </div>

        <article>
          <h1>The Idea Behind This Example</h1>

          <p>
            <a href='https://www.apollographql.com/client/'>Apollo </a>
            is a GraphQL client that allows you to easily query the exact data
            you need from a GraphQL server. In addition to fetching and mutating
            data, Apollo analyzes your queries and their results to construct a
            client-side cache of your data, which is kept up to date as further
            queries and mutations are run, fetching more results from the
            server.
          </p>

          <p>
            In this simple example, we integrate Apollo seamlessly with
            <a href='https://github.com/zeit/next.js'> Next </a>
            by wrapping our Page component inside a
            <a href='https://facebook.github.io/react/docs/higher-order-components.html'>
              higher-order component (HOC)
            </a>
            . Using the HOC pattern were able to pass down a central store of
            query result data created by Apollo into our React component
            hierarchy defined inside a page of our Next application.
          </p>
        </article>
      </>
    }
    footer={<Footer />}
  />
);

// Disable Apollo ssr fetching in favor of automatic static optimization
export default withApollo({ ssr: false })(ClientOnlyPage);
