import { ApolloProvider, gql } from "@apollo/client";
import { Component } from "react";
import client from "./apollo";
import { Header } from "./components/Header/Header";
import styles from "./App.module.scss";
import { Card } from "./components/Card/Card";
import {
  GET_CATEGORIES,
  GET_PRODUCTS_BY_ALL,
  GET_PRODUCTS_BY_TECH,
} from "./graphql/queries";
import { logDOM } from "@testing-library/react";

export class App extends Component {
  constructor() {
    super();
    this.categories = [];
    this.state = {
      currentCategory: "all",
      products: [],
    };
  }

  componentDidMount() {
    const getData = async () => {
      await client.query({ query: GET_CATEGORIES }).then(({ data }) => {
        this.categories = data.categories;
        this.setState({ currentCategory: this.categories[0].name });
      });
      await client
        .query({
          query: gql`
          {
            category(input: { title: "${this.state.currentCategory}" }) {
              products {
                id
                brand
                name
                inStock
                gallery
                prices {
                  currency {
                    symbol
                  }
                  amount
                }
              }
            }
          }
        `,
        })
        .then(({ data }) =>
          this.setState({ products: data.category.products })
        );
    };
    getData();
    console.log("didMount");
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category });
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.currentCategory !== this.state.currentCategory) {
      client
        .query({
          query: gql`
          {
            category(input: { title: "${this.state.currentCategory}" }) {
              products {
                id
                brand
                name
                inStock
                gallery
                prices {
                  currency {
                    symbol
                  }
                  amount
                }
              }
            }
          }
        `,
        })
        .then(({ data }) =>
          this.setState({ products: data.category.products })
        );
    }
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div className={styles.wrapper}>
          <Header
            categories={this.categories}
            currentCategory={this.state.currentCategory}
            changeCategory={this.changeCategory}
          />
          <h1>{this.state.currentCategory.toLocaleUpperCase()}</h1>
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
