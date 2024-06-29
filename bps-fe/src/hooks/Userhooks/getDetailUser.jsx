import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../helper/api/baseUrl";

export const GetDataUserDetail = () => {
  const token = localStorage.getItem("token");
  const [dataUser, setDataClient] = useState({});

  const getDataApi = async () => {
    await axios
      .get(`${endpoint}/user`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setDataClient(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataApi();
  }, []);

  return {
    dataUser,
  };
};
