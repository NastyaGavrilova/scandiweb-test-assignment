import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";

import Header from "./components/Header/Header";

class App extends React.Component {
  render() {
    const {
      data: { loading, error, categories, currencies },
    } = this.props;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <div className="App">
        <Header categories={categories} currencies={currencies} />
      </div>
    );
  }
}
const withProductQuery = graphql(gql`
  query getProductsCategory {
    categories {
      name
      products {
        id
        name
        brand
        gallery
        inStock
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        description
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
      }
    }
    currencies {
      label
      symbol
    }
  }
`);
const AppWithData = withProductQuery(App);
export default AppWithData;
