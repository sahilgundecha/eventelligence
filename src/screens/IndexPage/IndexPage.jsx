import React from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const isAuthenticated = !!localStorage.getItem("user");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return <div></div>;
};

export default IndexPage;
