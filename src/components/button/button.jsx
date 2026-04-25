import cn from "classnames";

import styles from "./button.module.css";

export const Button = (props) => {
  const { className, use = "primary", children, ...otherProps } = props;

  return (
    <button className={cn(styles.button, styles[`button--${use}`], className)} {...otherProps}>
      {children}
    </button>
  );
};
