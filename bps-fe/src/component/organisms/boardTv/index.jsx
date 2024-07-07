import { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import HeaderTV from "../../molecules/headerTv";

const BoardTvLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = (value) => {
    if (value != null) {
      setSidebarOpen(value);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token == null || (role != "tv" && role != "tv")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-background">
      <div className="relative flex h-screen overflow-hidden ">
        <div className="flex flex-1 bg-white flex-col overflow-x-hidden">
          <HeaderTV handleClick={toggle} />

          <main className="relative overflow-y-auto bg-background">
            <div className=" lg:ml-[-10px] lg:mt-[-15px]  h-fit p-4 md:p-6 2xl:p-7 overflow-y-auto -z-50 ">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BoardTvLayout;
