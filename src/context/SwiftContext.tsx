/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useFetchData } from "../hooks/apiCall";
import type { User } from "../model/typeDefinitions";

type SwiftContextType = {
  user: User | null;
  userInfoLoader: boolean;
};

const SwiftContext = createContext<SwiftContextType | null>(null);

export const SwiftContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  //   API's
  const {
    call: fetchUserInfoAPICaller,
    loading: userInfoLoader,
    // data: userInfoResult,
  } = useFetchData<User[]>();

  useEffect(() => {
    getUserInfo();
  }, []);
  console.log(user);
  const getUserInfo = async () => {
    try {
      const response = await fetchUserInfoAPICaller(`users`);
      if (!response.ok) {
        alert(response.error);
        return;
      }
      setUser(response.data[0]);
      console.log(response);
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      alert(errorMessage);
    }
  };

  return (
    <SwiftContext.Provider
      value={{
        user,
        userInfoLoader,
      }}
    >
      {children}
    </SwiftContext.Provider>
  );
};

export const useSwiftContext = () => {
  const ctx = useContext(SwiftContext);
  if (!ctx)
    throw new Error("useAdminContext must be used within VaultContextProvider");
  return ctx;
};
