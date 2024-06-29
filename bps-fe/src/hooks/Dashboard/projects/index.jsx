import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../../helper/api/baseUrl";

export const GetProjectCount = (props) => {
  const token = localStorage.getItem("token");

  const [dataProject, setdataProject] = useState([]);

  const getProjectCount = async () => {
    await axios
      .get(`${endpoint}/dashboard/order?all=${props}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const order = res.data.data;
        setdataProject(order);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProjectCount();
  }, []);

  return {
    dataProject,
  };
};
