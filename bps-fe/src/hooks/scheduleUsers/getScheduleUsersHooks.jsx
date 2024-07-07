import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../helper/api/baseUrl";

export const GetScheduleUsersHooks = (props) => {
  const token = localStorage.getItem("token");
  const [getScheduleUsers, setScheduleUsers] = useState([]);
  const [change, setChange] = useState(false);

  const SetChange = () => {
    setChange(!change);
  };

  const getScheduleUsersData = async () => {
    await axios
      .get(`${endpoint}/schedule-users?scheduleId=${props}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setScheduleUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getScheduleUsersData();
  }, [change]);
  return {
    getScheduleUsers,
    SetChange,
  };
};
