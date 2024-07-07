import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { endpoint } from "../../../helper/api/baseUrl";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import UserEditPopUp from "../../molecules/popup/UserEdit";
import { GetTeamsHooks } from "../../../hooks/TeamHooks/getTeamHooks";
import TeamEditPopUp from "../../molecules/popup/TeamEditPopUp";

export const TeamTable = ({ showModal, search, page }) => {
  const [dataUser, setDataUser] = useState({});
  const [modalEdit, setModalEdit] = useState(false);
  const {
    getTeams,
    prev,
    next,
    paging,
    active,
    setActive,
    SetChange,
    setSearch,
  } = GetTeamsHooks(page);

  useEffect(() => {
    SetChange(showModal);
    setSearch(search);
  }, [showModal, search]);

  const onDelete = (id) => {
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
        await axios
          .delete(`${endpoint}/teams/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            SetChange();
          })
          .catch(() => {
            Swal.fire({
              title: "Delete Gagal!",
              text: "Terjadi kendala saat delete",
              icon: "error",
            });
          });
      }
    });
  };

  const pageNumbers = [];
  let countpage = active - 1;
  for (let i = 1; i <= 3; i++) {
    if (countpage == 0) {
      countpage = 1;
    }

    if (countpage <= paging.maxPage) {
      pageNumbers.push(countpage);
    }
    countpage++;
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button
        key={number}
        className={`relative block rounded  px-3 py-1.5 text-sm  transition-all duration-300 hover:bg-blue-100 ${
          active === number
            ? "bg-primary text-white"
            : "bg-transparent text-neutral-600"
        }`}
        onClick={() => {
          setActive(number);
        }}
      >
        {number}
      </button>
    );
  });

  return (
    <div className="overflow-x-auto w-full">
      {getTeams ? (
        <table className="items-center bg-transparent w-full border-collapse overflow-x-auto">
          <thead>
            <tr className="border-b-2 border-background">
              <th className="px-6 text-gray-700 align-middle   py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-line font-semibold text-left">
                Name
              </th>
              <th className="px-6  text-gray-700 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-line font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-700 ">
            {getTeams.map((item, key) => (
              <tr className="border-b-2 border-[#89898]" key={key}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                  {item.name}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-line p-4 text-center flex justify-center gap-3 items-center">
                  <button
                    onClick={() => {
                      setDataUser(item);
                      setModalEdit(true);
                    }}
                  >
                    <MdEdit className="w-full text-blue-500" />
                  </button>
                  <button
                    onClick={() => {
                      onDelete(item.id);
                    }}
                  >
                    <RiDeleteBin5Line className="w-full text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>loading</h1>
      )}
      <div className="flex items-center gap-4 justify-end mt-3">
        <button
          className="flex items-center gap-2 relative rounded  hover:bg-blue-100 px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 "
          onClick={prev}
          disabled={active === 1}
        >
          Previous
        </button>
        <div className="flex items-center gap-2">{renderPageNumbers}</div>
        <button
          className="flex items-center gap-2 relative rounded  hover:bg-blue-100 px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 "
          onClick={next}
          disabled={active === paging.maxPage}
        >
          Next
        </button>
      </div>
      <TeamEditPopUp
        data={dataUser}
        showModal={modalEdit}
        setShowModal={setModalEdit}
        SetChange={SetChange}
      />
    </div>
  );
};
