import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { routePageName } from "../../../redux/action";
import { ScheduleTable } from "../../../component/atoms/table/scheduleTable";
import Calendar from "react-calendar";

const StaffDashboard = () => {
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
          <div className="w-full h-fit lg:h-full bg-white p-6 flex flex-col gap-3 rounded flex-1 ">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <ScheduleTable
                showModal={showModal}
                search={search}
                page={10}
                typePage={"dashboard"}
              />
            </div>
          </div>
        </div>
        <div>
          <Calendar
            className="react-calendar"
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
      <div className="w-full h-full ">
        <div className="w-full h-fit lg:h-full bg-white  p-6 flex flex-col gap-3 rounded flex-1 ">
          <div className="flex items-center justify-between flex-wrap gap-3">
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
  );
};

export default StaffDashboard;
