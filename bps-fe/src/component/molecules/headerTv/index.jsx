import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import logoApp from "/LogoApp.png";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { GetDataUserDetail } from "../../../hooks/Userhooks/getDetailUser";
import ProfileModal from "../popup/PopupProfile";

// eslint-disable-next-line react/prop-types
const HeaderTV = ({ handleClick }) => {
  const ref = useRef(null);
  const [popup, setPopUp] = useState();
  const navigate = useNavigate();
  const { dataUser } = GetDataUserDetail();
  const [dropdown, setDropdown] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className=" flex justify-between items-center p-2 pr-5 pl-5 w-full">
      <div className="flex gap-3">
        <button className="block sm:hidden" onClick={handleClick}>
          <RxHamburgerMenu className="text-[30px]" />
        </button>
        <div className="flex items-center justify-center ">
          <img
            src={logoApp}
            className="w-100 max-w-[80px] h-auto hidden md:block"
          />
          <div className="flex items-center justify-center">
            <h3 className="text-primary">BPS</h3>
          </div>
        </div>
      </div>
      <div className=" mt-3 md:px-5 md:py-3 bg-white md:bg-[#E8F2FB] rounded-full text-primary relative">
        <button onClick={() => setDropdown(!dropdown)} ref={ref}>
          <div className="flex gap-3 items-center justify-center">
            <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center">
              <FaUserCircle className="w-[40px] h-[40px]" />
            </div>
            <div className="flex-col justify-start items-center text-left hidden md:flex">
              <p className="w-full">{dataUser.email}</p>
              {dataUser.role ? (
                <p className="w-full">{dataUser.role.name}</p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </button>
        {dropdown ? (
          <div
            className="w-fit h-fit right-0 lg:left-0 mt-4 z-50 absolute bg-[#E8F2FB] rounded-lg"
            ref={ref}
          >
            <div>
              <button
                className="flex gap-3 py-2 mt-3 px-5 w-full justify-start items-center"
                onClick={() => {
                  setPopUp(!popup);
                }}
              >
                <FaUser />
                <p>Profile</p>
              </button>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="flex gap-3 py-2 px-5  w-full justify-start items-center"
              >
                <FiLogOut />
                <p>Logout</p>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ProfileModal setShowModal={setPopUp} showModal={popup} />
    </div>
  );
};

export default HeaderTV;
