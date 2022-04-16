import { Component } from "react";
import styles from "./Card.module.scss";
import sort from "../../assets/images/Image.jpg";

export class Card extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.wrapper}>
          <img src={sort} alt="image" />
          <span>Apollo Running Short</span>
          <span>$50.00</span>
        </div>
      </div>
    );
  }
}
