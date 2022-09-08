import React, { createContext, useState } from "react";

const ContextAPI = createContext();

export function DataProvider({ children }) {
  const [isToApprove, setToApprove] = useState([]);

  const ToApprove = (data) => {
    setToApprove([...isToApprove, data]);
  };

  return (
    <ContextAPI.Provider value={{ ToApprove, isToApprove, setToApprove }}>
      {children}
    </ContextAPI.Provider>
  );
}

export default ContextAPI;
