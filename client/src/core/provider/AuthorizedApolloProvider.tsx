import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { env } from "core/env";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const AuthorizedApolloProvider: React.FC<Props> = ({ children }) => {
  const errorLink = onError((response) => {
    // !excludedOperations.includes(response.operation.operationName) && notifyGraphQLErrors(response)

    const { graphQLErrors, networkError } = response;
    networkError && console.log(`[Network error]: ${networkError}`);
    graphQLErrors?.forEach?.(({ message, extensions, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Path: ${path}`,
        extensions
      )
    );
  });

  /**
   * simplifies a lot debuging with the devtools
   */
  const debugFetch: typeof fetch = !env.isDebug
    ? fetch
    : (input, init) => {
        try {
          const operationName = JSON.parse(
            init?.body?.toString() || "{}"
          ).operationName;
          return fetch(input + "?o=" + operationName, init);
        } catch (e) {
          return fetch(input, init);
        }
      };

  const httpLink = createHttpLink({
    uri: env.serverEndpoint,
    fetch: debugFetch
  });

  // TODO: subscription for chat

  //   const wsLink = new WebSocketLink({
  //     uri: env.subscriptionServerEndpoint,
  //     options: {
  //       lazy: true,
  //       reconnect: true,
  //       connectionParams: async () => {
  //           //TODO
  //           const token = ''
  //           return {
  //             Authorization: `Bearer ${token}`,
  //           }
  //       },
  //     },
  //   })

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    // wsLink,
    httpLink
  );

  const authLink = setContext(async () => {
    //TODO
    const token = "";
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(errorLink).concat(splitLink),
    cache: new InMemoryCache(),
    connectToDevTools: true
  });
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
