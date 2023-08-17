import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import Layout from "../components/Layout";
import { middleware } from "../utils/middlewares";
import { ConfirmProvider } from "material-ui-confirm";

function MyApp({ Component, pageProps, router }: AppProps) {
  console.log("🚀 ~ file: _app.tsx ~ line 8 ~ MyApp ~ router", router);
  const client = useApollo(pageProps);
  const ssrMode = typeof window === "undefined";
  if (!ssrMode) {
    middleware();
  }

  return (
    <ConfirmProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ConfirmProvider>
  );
}

export default MyApp;
