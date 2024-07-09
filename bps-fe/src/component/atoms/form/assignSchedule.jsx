import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosSearch, IoMdPersonAdd } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { GetTeamsHooks } from "../../../hooks/TeamHooks/getTeamHooks";
import { endpoint } from "../../../helper/api/baseUrl";
import { GetScheduleTeamsHooks } from "../../../hooks/ScheduleTeam/getScheduleTeamHooks";

export const FormAssignScheduleTeam = ({ data, setShowModal, setChange }) => {
  const token = localStorage.getItem("token");

  //   const { getUsers, setRole, setSearchName } = GetUsersHooks(40, "petugas");
  //   const { assingedData, SetChange } = GetAssignedHooks(data);
  const { getTeams, prev, next, paging, active, setActive, setSearch } =
    GetTeamsHooks(199);
  const [isLoading, setLoading] = useState("");
  const [teamId, setteamId] = useState("");
  const [dropdown, setDropDown] = useState(false);
  const [name, setName] = useState("");

  const { getScheduleTeams, SetChange } = GetScheduleTeamsHooks(data.id);

  useEffect(() => {
    // setRole("petugas");
    // setSearchName(search);
  }, []);

  const submitAssign = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${endpoint}/schedule-teams`,
          {
            scheduleId: data.id,
            teamId: teamId,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          Swal.fire({
            title: "Tambah Berhasil!",
            icon: "success",
          });
          setChange();
          SetChange();
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: "Tambah Gagal!",
            text: "Tim sudah di assign",
            icon: "error",
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAssign = async (id) => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios
            .delete(`${endpoint}/schedule-teams/${id}`, {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              setLoading(false);
              Swal.fire({
                title: "menghapus Berhasil!",
                icon: "success",
              });
              setChange();
              SetChange();
            })
            .catch((err) => {
              setLoading(false);

              Swal.fire({
                title: "gagal menghapus!",
                text: "gagal dihapus",
                icon: "error",
              });
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col gap-5">
      <div className="flex items-center justify-center gap-3">
        <div className="flex w-full flex-col relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pilih Tim
          </label>
          <div
            onClick={() => {
              setDropDown(!dropdown);
            }}
            //   {...register("name", { required: false, maxLength: 200 })}
            className="text-[#737373]  cursor-pointer border border-gray-300 relative text-sm rounded-lg  flex w-full py-3 px-1 text-left justify-between items-center"
          >
            <p className="w-full ml-3">{name == "" ? "Pilih Tim" : name}</p>
            {!dropdown ? <FaAngleDown /> : <FaAngleUp />}
          </div>
          <div
            className={`flex-col ${
              dropdown ? "flex" : "hidden"
            }  bg-white rounded-lg border-gray-300 top-20 border w-full absolute z-auto left-0 overflow-auto max-h-[200px]`}
          >
            <ul className="relative w-100">
              <div className="fixed w-100">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IoIosSearch />
                </div>
                <input
                  className="block w-full p-2 ps-9 text-sm text-gray-900 rounded-lg focus:outline-none"
                  placeholder="Search Tim"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <div className="mt-8">
                {true ? (
                  getTeams.map((item, key) => (
                    <li
                      className="p-3 cursor-pointer"
                      onClick={() => {
                        setDropDown(!dropdown);
                        setteamId(item.id);
                        setName(item.name);
                      }}
                    >
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="p-3">loading...</li>
                )}
              </div>
            </ul>
          </div>
        </div>
        {!isLoading ? (
          <button
            className="bg-primary rounded-lg font-bold px-2 py-3 flex items-center justify-center mt-5 text-white"
            onClick={() => submitAssign()}
          >
            <p>Add</p>
          </button>
        ) : (
          <button>
            {" "}
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="flex flex-wrap border-solid border-2 border-gray-200 rounded p-5 h-100">
        {getScheduleTeams
          ? getScheduleTeams.map((item, index) => (
              <span
                key={index}
                class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded "
              >
                {item.team.name}
                <button
                  type="button"
                  class="inline-flex items-center p-1  ms-2 text-sm text-gray-500 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 "
                  data-dismiss-target="#badge-dismiss-red"
                  aria-label="Remove"
                  onClick={() => deleteAssign(item.id)}
                >
                  <svg
                    class="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Remove badge</span>
                </button>
              </span>
            ))
          : ""}
      </div>
    </div>
  );
};
