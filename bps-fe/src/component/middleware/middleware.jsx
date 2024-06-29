import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const MiddlewareUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
};

export default MiddlewareUser;
