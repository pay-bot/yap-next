import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";



export const withPublic = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
   
    const isAdmin = useSelector((state) => state.authReducer);

    useEffect(() => {
      if (isAdmin.adminToken) {
        router.replace("/account");
        return null;
      }
    }, [isAdmin.adminToken]);

    // if (isAdmin.adminToken ) {
    //   return <h1>Loading here!</h1>; // full-screen loader here
    // }

    return <WrappedComponent {...props} />;
  };
};

// withProtected checks if the user is not logged in, if not it will reroute to '/login'.
// (ex:) a logged out user tries to access /account, they will be rerouted to /login.
export const withProtected = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
   
    const isAdmin = useSelector((state) => state.authReducer);

    useEffect(() => {
      if (!isAdmin.adminToken) {
        router.replace("/login");
        return null;
      }
    }, [!isAdmin.adminToken]);

    // if (!isAdmin.adminToken ) {
    //   return <h1>Loading here!</h1>; // full-screen loader here
    // }

    return <WrappedComponent {...props} />;
  };
};
