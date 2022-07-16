import React from "react";
import { render } from "react-dom";
// import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// ReactDOM.render(<App />, document.getElementById("root"));
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
