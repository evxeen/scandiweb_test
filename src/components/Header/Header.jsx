import { Component } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/a-logo.svg";
import arrow from "../../assets/images/arrow-down.svg";
import cart from "../../assets/images/cart.svg";
import client from "../../apollo";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/queries";
import { SelectCurrency } from "../SelectCurrency/SelectCurrency";

export class Header extends Component {
  constructor(props) {
    super();
    this.currencies = [];
    this.state = {
      currentCurrency: "",
      selectCurrencyVisible: false,
    };
  }
  componentDidMount() {
    const getData = async () => {
      await client
        .query({ query: GET_CURRENCIES })
        .then(({ data }) => (this.currencies = data.currencies));

      this.setState({ currentCurrency: this.currencies[0].symbol });
    };
    getData();
  }

  changeCategoryHandler = (category) => {
    this.props.changeCategory(category);
  };

  showSelect = () => {
    this.setState((prev) => ({
      selectCurrencyVisible: !prev.selectCurrencyVisible,
    }));
  };

  changeCurrentCurrency = (currency) => {
    this.setState({ currentCurrency: currency });
    this.setState((prev) => ({
      selectCurrencyVisible: !prev.selectCurrencyVisible,
    }));
  };

  render() {
    return (
      <div className={styles.header}>
        <ul>
          {this.props.categories.map((el) => (
            <li key={el.name}>
              <a
                onClick={() => this.changeCategoryHandler(el.name)}
                href="#"
                className={`${styles.link} ${
                  this.props.currentCategory === el.name
                    ? `${styles.active}`
                    : ""
                }`}
              >
                {el.name}
              </a>
            </li>
          ))}
        </ul>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.options}>
          <p>{this.state.currentCurrency}</p>
          <img onClick={this.showSelect} src={arrow} alt="arrow" />
          <img src={cart} alt="cart" />
        </div>
        {this.state.selectCurrencyVisible && (
          <SelectCurrency
            currencies={this.currencies}
            changeCurrentCurrency={this.changeCurrentCurrency}
          />
        )}
      </div>
    );
  }
}
