
import { withApollo } from '../graphql/apollo';

const ClientOnlyPage = () => (
  <div>

    This example shows how to disable apollos query fetching on the server.
    If you
    {' '}
    <a href="/client-only">reload</a>
    {' '}
    this page, you will see a loader since Apollo
    didnt fetch any data on the server. This allows
    {' '}
    <a
      href="https://nextjs.org/blog/next-9#automatic-static-optimization"
    >
      automatic static optimization
    </a>
    .

    <article>
      <h1>The Idea Behind This Example</h1>
      <p>
        <a href="https://www.apollographql.com/client/">Apollo</a>
        is a GraphQL
        client that allows you to easily query the exact data you need from a
        GraphQL server. In addition to fetching and mutating data, Apollo
        analyzes your queries and their results to construct a client-side cache
        of your data, which is kept up to date as further queries and mutations
        are run, fetching more results from the server.
      </p>
      <p>
        In this simple example, we integrate Apollo seamlessly with
        {' '}
        <a href="https://github.com/zeit/next.js">Next</a>
        {' '}
        by wrapping our Page
                component inside a
        {' '}
        <a href="https://facebook.github.io/react/docs/higher-order-components.html">
          higher-order component (HOC)
        </a>
        . Using the HOC pattern were able to pass down a central store of query
        result data created by Apollo into our React component hierarchy defined
        inside a page of our Next application.
      </p>
      <p>
        On initial page load, while on the server and inside getInitialProps, we
        invoke the Apollo method,
        {' '}
        <a href="https://www.apollographql.com/docs/react/api/react-ssr/#getdatafromtree">
          getDataFromTree
        </a>
        . This method returns a promise; at the point in which the promise
        resolves, our Apollo Client store is completely initialized.
      </p>
      <p>
        This example relies on
        {' '}
        <a href="http://graph.cool">graph.cool</a>
        {' '}
        for
                its GraphQL backend.
      </p>
    </article>
  </div>
);

export default withApollo(ClientOnlyPage, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false
});
