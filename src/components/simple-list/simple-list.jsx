import cn from "classnames";

import styles from "./simple-list.module.css";

export const SimpleList = (props) => {
  const { className, items = [], rowSlot } = props;

  return (
    <ul className={cn(styles.list, className)}>
      {items.map((item, index) => (
        <li key={item.id ?? index} className={cn(styles.item)}>
          {rowSlot(item, index)}
        </li>
      ))}
    </ul>
  );
};
