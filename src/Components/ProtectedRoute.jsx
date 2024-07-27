import React, { useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { DataContext } from "./Datapprovider/DataProvider";

const ProtectedRoute = ({ children, message, redirect }) => {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);
  const [loading, setLoading] = useState(true); // To handle loading state
 
 

  useEffect(() => {
    // If there is no user, redirect to the auth page
    if (!user) {
      navigate("/auth", { state: { message, redirect } });
    } else {
      setLoading(false); // If user exists, stop loading
    }
  }, [user, navigate, message, redirect]);

  // Return null or a loading spinner while checking user authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render children if user is authenticated
  return children;
};

export default ProtectedRoute;
