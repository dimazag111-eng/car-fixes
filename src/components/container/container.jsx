import cn from "classnames";

import styles from "./container.module.css";

export const Container = (props) => {
  const { className, children, ...otherProps } = props;

  return (
    <div className={cn(styles.container, className)} {...otherProps}>
      {children}
    </div>
  );
};
