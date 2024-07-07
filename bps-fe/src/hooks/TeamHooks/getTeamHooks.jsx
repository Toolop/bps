import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../helper/api/baseUrl";

export const GetTeamsHooks = (props) => {
  const token = localStorage.getItem("token");
  const [getTeams, setTeams] = useState([]);
  const [change, setChange] = useState(false);
  const [paging, setPaging] = useState({});
  const [active, setActive] = useState(1);
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

  const getTeamsData = async () => {
    await axios
      .get(`${endpoint}/teams?page=${active}&size=${props}&search=${search}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setTeams(res.data.data);
        setPaging(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTeamsData();
  }, [active, change, search]);
  return {
    getTeams,
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
