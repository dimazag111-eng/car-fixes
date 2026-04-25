/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const OrderSnapshotContext = createContext(null);

export const OrderSnapshotStoreProvider = ({ children }) => {
  const [snapshot, setSnapshot] = useState(null);

  const addSnapshot = (snapshot) => setSnapshot(snapshot);
  const resetSnapshot = () => setSnapshot(null);

  return (
    <OrderSnapshotContext.Provider
      value={{
        snapshot,
        addSnapshot,
        resetSnapshot,
      }}
    >
      {children}
    </OrderSnapshotContext.Provider>
  );
};

export const useOrderSnapshotStore = () => {
  const context = useContext(OrderSnapshotContext);

  if (!context) {
    throw new Error("useOrderSnapshot must be used within OrderSnapshotProvider");
  }

  return context;
};
