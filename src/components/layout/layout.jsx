import cn from "classnames";

import styles from "./layout.module.css";
import { Header } from "./ui/header/header";

export const Layout = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <main className={cn(styles.main)}>{children}</main>
    </>
  );
};
