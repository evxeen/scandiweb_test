import { Component } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/a-logo.svg";
import currency from "../../assets/images/dollar.svg";
import arrow from "../../assets/images/arrow-down.svg";
import cart from "../../assets/images/cart.svg";
import client from "../../apollo";
import { CATEGORIES_QUERY } from "../../graphql/categories";

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    client
      .query({ query: CATEGORIES_QUERY })
      .then(({ data }) =>
        this.setState(this.setState({ categories: data.categories }))
      );
  }

  render() {
    return (
      <div className={styles.header}>
        <ul>
          {this.state.categories.map((el) => (
            <li key={el.name}>
              <a href="#">{el.name}</a>
            </li>
          ))}
        </ul>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.options}>
          <img src={currency} alt="currency" />
          <img src={arrow} alt="arrow" />
          <img src={cart} alt="cart" />
        </div>
      </div>
    );
  }
}
