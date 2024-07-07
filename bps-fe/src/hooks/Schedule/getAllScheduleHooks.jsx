import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../helper/api/baseUrl";

export const GetAllSchedulesHooks = (props, today) => {
  const token = localStorage.getItem("token");
  const [getSchedules, setSchedules] = useState([]);
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

  const getSchedulesData = async () => {
    await axios
      .get(
        `${endpoint}/all-schedules?page=${active}&size=${props}&search=${search}&now=${today}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setSchedules(res.data.data);
        setPaging(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSchedulesData();
  }, [active, change, search]);
  return {
    getSchedules,
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
