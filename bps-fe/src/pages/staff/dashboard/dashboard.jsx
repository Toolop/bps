import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { routePageName } from "../../../redux/action";

const StaffDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Dashboard"));
  }, []);
  return (
    <div className="flex flex-wrap gap-5 w-full ">
      <div className=" w-full flex gap-5 flex-wrap items-start">
        {/* <ProjectDashboard />
        <JobDashboard /> */}
      </div>
      <div className="w-full flex flex-wrap lg:flex-nowrap gap-5 justify-between">
        {/* <PestFound /> */}
        <div className="w-full lg:w-4/6 h-fit lg:h-full">
          {/* <PestFoundLine /> */}
        </div>
        <div className="w-full lg:w-2/6 h-fit lg:h-full">
          {/* <LastestActivityDashboard /> */}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
