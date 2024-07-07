import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { ScheduleTable } from "../../component/atoms/table/scheduleTable";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const DashboardTv = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    dispatch(routePageName("Dashboard"));
  }, []);
  return (
    <div className="flex flex-col gap-5 w-full rounded-2xl ">
      <div className=" w-full flex gap-5 flex-wrap lg:flex-nowrap">
        <div className="h-100 w-full">
          <div className="w-full h-fit lg:h-full  borderp-6 flex flex-col gap-3 rounded flex-1 ">
            <h3>Kegitan hari ini</h3>
            <div className="flex items-center justify-between bg-white flex-wrap gap-3">
              <ScheduleTable
                showModal={showModal}
                search={search}
                page={10}
                typePage={"dashboard"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
