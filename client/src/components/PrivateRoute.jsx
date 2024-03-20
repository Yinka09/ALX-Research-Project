import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

/* Checks whether the user is authenticated (currentUser exists).
If the user is authenticated, it allows access to the protected route. 
If the user is not authenticated, it redirects them to the sign-in page.
 */
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
