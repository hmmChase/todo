// https://spectrum.chat/next-js/general/next-js-9-automatic-prerendering-and-apollo~7060c02c-3de8-4c78-ab76-ced60c76c093
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import withApollo from '../graphql/withApollo';
import theme from '../styles/theme.style';

export class MyApp extends App {
  render() {
    console.log('_app render', new Date().getMilliseconds());

    // console.log('_app props: ', Object.keys(this.props));
    // console.log('_app props.apolloState: ', this.props.apolloState);

    // const cache = this.props.apollo.cache.extract();
    // console.log('apollo cache: ', cache);

    // pageProps includes data returned from getInitialProps

    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
