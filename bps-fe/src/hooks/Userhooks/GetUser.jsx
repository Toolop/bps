import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../helper/api/baseUrl";

export const GetUsersHooks = (props) => {
  const token = localStorage.getItem("token");
  const [getUsers, setUsers] = useState([]);
  const [paging, setPaging] = useState({});
  const [active, setActive] = useState(1);
  const [change, setChange] = useState(false);
  const [search, setSearch] = useState("");

  const SetChange = () => {
    setChange(!change);
  };

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const getUsersData = async () => {
    await axios
      .get(`${endpoint}/users?page=${active}&limit=${props}&search=${search}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUsers(res.data.data);
        setPaging(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsersData();
  }, [active, change, search]);
  return {
    getUsers,
    prev,
    next,
    paging,
    setPaging,
    active,
    setActive,
    SetChange,
    setSearch,
  };
};
