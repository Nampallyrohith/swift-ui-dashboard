/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useFetchData } from "../hooks/apiCall";
import type { Comment, User } from "../model/typeDefinitions";

type SwiftContextType = {
  user: User | null;
  userInfoLoader: boolean;
  commentsLoader: boolean;
  comments: Comment[];
};

const SwiftContext = createContext<SwiftContextType | null>(null);

export const SwiftContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  //   API's
  const {
    call: fetchUserInfoAPICaller,
    loading: userInfoLoader,
    // data: userInfoResult,
  } = useFetchData<User[]>();

  const {
    call: fetchCommentsAPICaller,
    loading: commentsLoader,
    // data: commentsResults,
  } = useFetchData<Comment[]>();

  useEffect(() => {
    getUserInfo();
    getComments();
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
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      alert(errorMessage);
    }
  };

  const getComments = async () => {
    try {
      const response = await fetchCommentsAPICaller(`comments`);
      if (!response.ok) {
        alert(response.error);
        return;
      }
      setComments(response.data);
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
        commentsLoader,
        comments,
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
