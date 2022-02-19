import React, { useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/config";

// Router that checks if the user is logged in.
// If not, redirect to './login'

interface IPrivateRoute {
  location: string;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({
  location,
  children,
  ...rest
}) => {
  const { user } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useLayoutEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
      } else {
        setShouldRedirect(true);
      }
    });
  }, [user]);

  if (shouldRedirect) {
    return (
      <Navigate
        to={{
          pathname: "/login",
        }}
        replace={true}
      />
    );
  }

  if (user) {
    return (
      <Routes>
        <Route path={location} element={children} {...rest} />
      </Routes>
    );
  } else {
    return <></>;
  }
};

export default PrivateRoute;
