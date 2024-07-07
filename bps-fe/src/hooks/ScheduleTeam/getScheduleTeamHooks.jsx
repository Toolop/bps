import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../../helper/api/baseUrl";

export const GetScheduleTeamsHooks = (props) => {
  const token = localStorage.getItem("token");
  const [getScheduleTeams, setScheduleTeams] = useState([]);
  const [change, setChange] = useState(false);

  const SetChange = () => {
    setChange(!change);
  };

  const getScheduleTeamsData = async () => {
    await axios
      .get(`${endpoint}/schedule-teams?scheduleId=${props}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setScheduleTeams(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getScheduleTeamsData();
  }, [change]);
  return {
    getScheduleTeams,
    SetChange,
  };
};
