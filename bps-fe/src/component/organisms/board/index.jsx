import { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../molecules/sidebar";
import Header from "../../molecules/header";

const BoardLayout = () => {
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
    console.log(token);
    console.log(role);
    if (token == null) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-background">
      <div className="relative flex h-screen overflow-hidden ">
        <Sidebar sidebarOpen={sidebarOpen} handleClick={toggle} />

        <div className="flex flex-1 flex-col overflow-x-hidden">
          <Header handleClick={toggle} />

          <main className="relative overflow-y-auto ">
            <div className=" lg:ml-[-10px] lg:mt-[-15px]  h-fit p-4 md:p-6 2xl:p-7 overflow-y-auto -z-50 ">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BoardLayout;
