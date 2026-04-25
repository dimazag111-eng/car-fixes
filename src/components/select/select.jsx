import cn from "classnames";

import styles from "./select.module.css";

export const Select = (props) => {
  const { className, value, placeholder, options = [], onReset, ...otherProps } = props;

  return (
    <div className={cn(styles.root, className)}>
      <select className={cn(styles.select)} value={value} {...otherProps}>
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {value ? (
        <button className={cn(styles.reset)} type="button" onClick={onReset}>
          X
        </button>
      ) : null}
    </div>
  );
};
