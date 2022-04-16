import { ApolloProvider } from "@apollo/client";
import { Component } from "react";
import client from "./apollo";
import { Header } from "./components/Header/Header";
import styles from "./App.module.scss";
import { Card } from "./components/Card/Card";
import { GET_PRODUCTS_BY_ALL } from "./graphql/queries";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    client
      .query({ query: GET_PRODUCTS_BY_ALL })
      .then(({ data }) => this.setState({ products: data.category.products }));

    setTimeout(() => {
      // console.log(this.state);
    }, 1000);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className={styles.wrapper}>
          <Header />
          <h1>Category name</h1>
          <div className={styles.products}>
            {this.state.products.map((product) => (
              <Card key={product.id} data={product} />
            ))}
          </div>
        </div>
      </ApolloProvider>
    );
  }
}
