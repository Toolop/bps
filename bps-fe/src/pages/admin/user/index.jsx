import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { routePageName } from "../../../redux/action";
import { UsersTable } from "../../../component/atoms/table/userTable";
import { IoIosSearch } from "react-icons/io";
import UserRegisterModal from "../../../component/molecules/popup/UserRegister";

const UserAdmin = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const handleClickModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    dispatch(routePageName("User"));
  }, []);
  return (
    <div className="flex flex-wrap items-start gap-5 w-full rounded-2xl border bg-white p-5 h-fit ">
      <div className=" w-full flex gap-5 flex-wrap  items-center justify-between">
        <h5>User management</h5>
        <div className="flex gap-5">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoIosSearch />
            </div>
            <input
              type="search"
              onChange={(event) => setSearch(event.target.value)}
              className="bg-[#E8F2FB] block w-full p-2 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-primary"
              placeholder="Search User"
            />
          </div>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className={`px-5 py-2 w-fit h-full max-h-10 text-white bg-primary rounded-full`}
          >
            <p> Add</p>
          </button>
        </div>
      </div>
      <div className="flex w-full h-full">
        <UsersTable showModal={showModal} search={search} page={10} />
      </div>
      <UserRegisterModal
        showModal={showModal}
        setShowModal={handleClickModal}
        searchEmail={searchEmail}
        type={"admin"}
      />
    </div>
  );
};

export default UserAdmin;
