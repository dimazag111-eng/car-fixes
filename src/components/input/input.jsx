import cn from "classnames";

import styles from "./input.module.css";

export const Input = (props) => {
  const { className, ...otherProps } = props;

  return <input className={cn(styles.input, className)} {...otherProps} />;
};
