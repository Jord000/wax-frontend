import { createContext, useState } from "react";

interface UserContext {
  user: { username: string };
  setUser: Function;
}

export const UserContext = createContext<UserContext>({} as UserContext);

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState({ username: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
