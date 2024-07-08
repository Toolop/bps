import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { routePageName } from "../../../redux/action";
import { ScheduleTable } from "../../../component/atoms/table/scheduleTable";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoIosSearch } from "react-icons/io";
import moment from "moment";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusActivity, setStatus] = useState("");
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
                page={10}
                today={1}
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
        <div className=" w-full flex flex-col gap-5 flex-wrap  items-start justify-start mb-5">
          <h5>Semua Kegiatan</h5>
          <div className="flex gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoIosSearch />
              </div>
              <input
                type="search"
                onChange={(event) => setSearch(event.target.value)}
                className="bg-white block w-full p-2 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-white"
                placeholder="Search Name"
              />
            </div>
            <div className="flex gap-5">
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="bg-white text-[#737373] border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 "
              >
                <option selected>Pilih Status</option>
                <option value={"offline"} key={1}>
                  offline
                </option>
                <option value={"online"} key={2}>
                  online
                </option>
              </select>
            </div>
          </div>
          <p>{moment(value.toString()).locale("id").format("DD MMMM YYYY")}</p>
        </div>
        <div className="w-full h-fit lg:h-full bg-white  p-6 flex flex-col gap-3 rounded flex-1 ">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <ScheduleTable
              showModal={showModal}
              search={search}
              status={statusActivity}
              page={10}
              today={0}
              typePage={"dashboard"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
