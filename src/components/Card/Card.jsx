import { Component } from "react";
import styles from "./Card.module.scss";
import sort from "../../assets/images/Image.jpg";

export class Card extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.wrapper}>
          <img src={this.props.data.gallery[0]} alt="image" />
          <span>
            {this.props.data.brand} {this.props.data.name}
          </span>
          <span>
            {this.props.data.prices[0].currency.symbol}{" "}
            {this.props.data.prices[0].amount}
          </span>
        </div>
      </div>
    );
  }
}
