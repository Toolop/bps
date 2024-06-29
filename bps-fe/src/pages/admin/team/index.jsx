import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { routePageName } from "../../../redux/action";
import { TeamTable } from "../../../component/atoms/table/teamTable";
import TeamAddPopUp from "../../../component/molecules/popup/Team";

const TeamPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const handleClickModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    dispatch(routePageName("team"));
  }, []);
  return (
    <div className="flex flex-wrap items-start gap-5 w-full rounded-2xl border border-black p-5 h-fit ">
      <div className=" w-full flex gap-5 flex-wrap  items-center justify-between">
        <h5>Teams management</h5>
        <div className="flex gap-5">
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
        <TeamTable showModal={showModal} search={search} page={10} />
      </div>
      <TeamAddPopUp
        showModal={showModal}
        setShowModal={handleClickModal}
        searchEmail={searchEmail}
        type={"admin"}
      />
    </div>
  );
};

export default TeamPage;
