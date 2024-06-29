import { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import SidebarAdmin from "../../molecules/sidebarAdmin";
import Header from "../../molecules/header";

const BoardAdminLayout = () => {
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
    if (token == null || (role != "admin" && role != "Admin")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="relative flex h-screen overflow-hidden ">
        <SidebarAdmin sidebarOpen={sidebarOpen} handleClick={toggle} />

        <div className="flex flex-1 flex-col overflow-x-hidden">
          <Header handleClick={toggle} />

          <main className="relative overflow-y-auto">
            <div className=" lg:ml-[-10px] lg:mt-[-15px]  h-fit p-4 md:p-6 2xl:p-7 overflow-y-auto -z-50 ">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BoardAdminLayout;
