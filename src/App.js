import { ApolloProvider } from "@apollo/client";
import { Component } from "react";
import client from "./apollo";
import { Header } from "./components/Header/Header";
import styles from "./App.module.scss";

export class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className={styles.wrapper}>
          <Header />
        </div>
      </ApolloProvider>
    );
  }
}
