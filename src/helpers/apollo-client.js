import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
// import { UserState, useUser } from "store/userStore";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const userStorage = localStorage.getItem("user-storage");
  const token = userStorage && JSON.parse(userStorage).state.token;
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    if (headers) {
      // const token = headers.get("vendure-auth-token");
      // token && UserState.setToken(token);
    }
    return response;
  });
});

const httpLink = createHttpLink({
  uri: "http://localhost:3000/shop-api",
  // uri: `${process.env.REACT_APP_API_URL}admin-api`,
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: afterwareLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
