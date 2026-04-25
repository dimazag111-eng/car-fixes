import cn from "classnames";

import styles from "./service-card.module.css";

export const ServiceCard = (props) => {
  const { name, picture, price, actionsSlot } = props;

  return (
    <div className={cn(styles.root)}>
      <div className={cn(styles.picture)}>
        <img className={cn(styles.pictureImg)} src={picture} alt={""} />
      </div>

      <div className={cn(styles.box)}>
        <div className={cn(styles.info)}>
          <p className={cn(styles.name)}>{name}</p>

          <p className={cn(styles.price)}>
            <span className={cn(styles.priceSum)}>{price}</span>
            <span className={cn(styles.priceSymbol)}>₸</span>
          </p>
        </div>

        <div className={cn(styles.actions)}>{actionsSlot}</div>
      </div>
    </div>
  );
};
