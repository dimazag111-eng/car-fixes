import cn from "classnames";

import styles from "./cart-item.module.css";

export const CartItem = (props) => {
  const { name, category, picture, price, actionSlot } = props;

  return (
    <article className={cn(styles.card)}>
      <div className={cn(styles.picture)}>
        <img className={cn(styles.pictureImg)} src={picture} alt={""} />
      </div>

      <div className={cn(styles.box)}>
        <div className={cn(styles.info)}>
          <h3 className={cn(styles.title)}>{name}</h3>
          <p className={cn(styles.category)}>{category}</p>
        </div>

        <p className={cn(styles.price)}>
          <span className={cn(styles.priceSum)}>{price}</span>
          <span className={cn(styles.priceSymbol)}>₸</span>
        </p>
      </div>

      <div className={cn(styles.actions)}>{actionSlot}</div>
    </article>
  );
};
