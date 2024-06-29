import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../helper/api/baseUrl";

export const GetRoleHooks = () => {
  const token = localStorage.getItem("token");
  const [getRoles, setRoles] = useState([]);

  const getRolesData = async () => {
    await axios
      .get(`${endpoint}/roles`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setRoles(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRolesData();
  }, []);
  return {
    getRoles,
  };
};
