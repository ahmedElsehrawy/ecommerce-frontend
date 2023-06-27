import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { endPoint } from "./config";
import { setContext } from "@apollo/client/link/context";
import { AuthVar } from "./initialState";
import { useMemo } from "react";
import merge from "deepmerge";
//@ts-ignore
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

//@ts-ignore
const isServer = typeof widnow === "undefined";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read() {
            return AuthVar();
          },
        },
      },
    },
  },
});

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export const createApolloClient = () => {
  let token: string = "";

  const httpLink = createHttpLink({
    uri: endPoint,
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("auth");
      if (auth) {
        token = JSON.parse(auth).token;
      }
    }

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token.replaceAll('"', "")}` : token,
      },
    };
  });

  return new ApolloClient({
    ssrMode: isServer,
    link: authLink.concat(httpLink),
    cache: cache,
  });
};

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null
) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
}
