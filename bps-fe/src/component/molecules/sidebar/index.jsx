import { FaHome, FaListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import useScreenSize from "../../../hooks/screensize";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = ({ sidebarOpen, handleClick }) => {
  const ref = useRef(null);
  const { routeName } = useSelector((state) => state.userReducer);
  const [isExpand, setExpand] = useState(false);
  const screenSize = useScreenSize();
  console.log(screenSize);

  useEffect(() => {
    if (screenSize.width < 640) {
      setExpand(true);
    } else {
      setExpand(false);
    }
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleClick]);

  return (
    <div
      ref={ref}
      className={
        screenSize.width <= 640
          ? `delay-150 w-3/5 h-screen absolute bg-white  ${
              sidebarOpen
                ? "translate-x-0 shadow-[0_0px_0px_1000000px_rgba(0,0,0,0.50)] "
                : "-translate-x-full "
            } transition ease-in-out delay-150  p-3 flex flex-col gap-5 z-10 `
          : `flex  p-3 flex-col gap-3  max-w-[300px]  ${
              isExpand ? "w-[200px]" : "w-[75px]"
            } transition-widht duration-300  
            ease-in ease-in-out relative bg-white`
      }
    >
      <button
        onClick={() => {
          if (screenSize.width > 640) {
            setExpand(!isExpand);
          }
        }}
        className={`transition ease-in-out flex items-center justify-start h-[30px] gap-1 relative  mb-3 ${
          isExpand ? "w-[180px] translate-x-0" : ""
        }`}
      >
        {/* <img
          src={logoApp}
          className={`h-full ${isExpand ? "translate-x-0" : "translate-x-1"}`}
          alt=""
        /> */}
        <GiHamburgerMenu
          className={`h-full w-fit ${
            isExpand ? "translate-x-0" : "translate-x-3"
          }`}
        />

        <h6
          className={`transition-all ease-in-out duration-500 ${
            isExpand ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          DigiPest
        </h6>
      </button>

      <ul className=" flex flex-col gap-3">
        <li className="w-full">
          <Link
            to={"/client/dashboard"}
            onClick={() => handleClick(false)}
            className={
              routeName == "Dashboard"
                ? `p-2 h-[33px] flex justify-start rounded items-center gap-3 bg-primary text-white hover:bg-[#DDE3F1] no-underline`
                : `p-2 h-[33px] flex justify-start rounded items-center gap-3 text-[#C6C6C6] hover:bg-[#DDE3F1] no-underline`
            }
          >
            <FaHome
              className={`w-[24px] text-center z-2 duration-300 ${
                isExpand ? "translate-x-0" : "translate-x-1"
              }`}
            />

            <p className={`  ${isExpand ? "" : " opacity-0 hidden"}`}>Home</p>
          </Link>
        </li>
        <li className="w-full">
          <Link
            onClick={() => handleClick(false)}
            to={"/client/orders"}
            className={
              routeName == "Orders"
                ? `p-2 h-[33px] flex justify-start rounded items-center gap-3 bg-primary text-white hover:bg-[#DDE3F1] no-underline`
                : `p-2 h-[33px] flex justify-start rounded items-center gap-3 text-[#C6C6C6] hover:bg-[#DDE3F1] no-underline`
            }
          >
            <FaListAlt
              className={`w-[24px] text-center z-2 duration-300 ${
                isExpand ? "translate-x-0" : "translate-x-1"
              }`}
            />

            <p className={`  ${isExpand ? "" : " opacity-0 hidden"}`}>
              Projects
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.boolean,
  handleClick: PropTypes.function,
};

export default Sidebar;
