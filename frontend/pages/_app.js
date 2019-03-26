/* eslint-disable no-console */
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import withApollo from '../graphql/withApollo';
import theme from '../styles/theme.style';
import Layout from '../components/Layout/Layout';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    console.log('MyApp GIP');

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    console.log('MyApp render');

    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
