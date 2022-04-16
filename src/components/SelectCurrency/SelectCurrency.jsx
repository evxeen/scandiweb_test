import { Component } from "react";
import styles from "./SelectCurrency.module.scss";

export class SelectCurrency extends Component {
  constructor(props) {
    super();
  }

  changeCurrencyHandler = (symbol) => {
    this.props.changeCurrentCurrency(symbol);
  };

  render() {
    return (
      <div className={styles.select}>
        {this.props.currencies.map((currency) => (
          <p
            key={currency.label}
            onClick={() => this.changeCurrencyHandler(currency.symbol)}
          >
            {currency.symbol} {currency.label}
          </p>
        ))}
      </div>
    );
  }
}
