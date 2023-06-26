import React, { createContext, useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function ProtectedRoute({ component: Component, ...rest }) {
    const { user } = useUser();
  
    return (
      <Route
        {...rest}
        render={props =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/auth', state: { from: props.location } }}
            />
          )
        }
      />
    );
  }