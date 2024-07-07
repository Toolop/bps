import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { routePageName } from "../../../redux/action";
import { UsersTable } from "../../../component/atoms/table/userTable";
import { GetTeamsHooks } from "../../../hooks/TeamHooks/getTeamHooks";

const AnggotaTeamPage = () => {
  const dispatch = useDispatch();
  const { getTeams, prev, next, paging, active, setActive, SetChange } =
    GetTeamsHooks(9999);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState();
  const handleClickModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    dispatch(routePageName("anggota"));
  }, []);
  return (
    <div className="flex flex-wrap items-start gap-5 w-full rounded-2xl border  p-5 h-fit bg-white">
      <div className=" w-full flex gap-5 flex-wrap  items-center justify-between ">
        <h5>Teams management</h5>
        <div className="flex gap-5">
          <select
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#E8F2FB] text-[#737373] border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 "
          >
            <option selected>Pilih Tim</option>
            {getTeams.map((item, key) => (
              <option value={item.id} key={key}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex w-full h-full">
        <UsersTable
          showModal={showModal}
          search={search}
          page={10}
          type="anggota"
        />
      </div>
    </div>
  );
};

export default AnggotaTeamPage;
