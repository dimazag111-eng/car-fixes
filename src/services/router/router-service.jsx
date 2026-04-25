/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const RouterContext = createContext(null);

export const RouterProvider = ({ children }) => {
  const [state, setState] = useState({
    route: { path: "" },
    history: [],
  });

  const navigate = (path, payload = {}) => {
    setState((prev) => ({
      route: { path, ...payload },
      history: [...prev.history, prev.route],
    }));
  };

  const back = () => {
    setState((prev) => {
      if (prev.history.length === 0) {
        return prev;
      }

      const history = [...prev.history];
      const previousRoute = history.pop();

      return {
        route: previousRoute,
        history,
      };
    });
  };

  return (
    <RouterContext.Provider
      value={{
        route: state.route,
        navigate,
        back,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const ctx = useContext(RouterContext);

  if (!ctx) {
    throw new Error("useRouter must be used inside RouterProvider");
  }

  return ctx;
};
