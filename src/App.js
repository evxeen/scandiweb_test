import { ApolloProvider } from "@apollo/client";
import { Component } from "react";
import client from "./apollo";
import { Header } from "./components/Header/Header";
import styles from "./App.module.scss";
import { Card } from "./components/Card/Card";

export class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className={styles.wrapper}>
          <Header />
          <h1>Category name</h1>
          <div className={styles.products}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}
