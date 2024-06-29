import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GetUsersHooks } from "../../../hooks/Userhooks/GetUser";
import { endpoint } from "../../../helper/api/baseUrl";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import TeamEditPopUp from "../../molecules/popup/TeamEditPopUp";
import { GetSchedulesHooks } from "../../../hooks/Schedule/getScheduleHooks";
import { GetAllSchedulesHooks } from "../../../hooks/Schedule/getAllScheduleHooks";
import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
import { IoMdDownload, IoMdPersonAdd } from "react-icons/io";
import ScheduleEditPopUp from "../../molecules/popup/scheduleEditPopUp";
import { Link } from "react-router-dom";
import { FaFile } from "react-icons/fa";
import { BiLogoZoom } from "react-icons/bi";

export const ScheduleTable = ({ showModal, search, page, typePage }) => {
  const [dataSchedule, setdataSchedule] = useState({});
  const [typePopup, setTypePopup] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const {
    getSchedules,
    prev,
    next,
    paging,
    active,
    setActive,
    SetChange,
    setSearch,
  } = GetAllSchedulesHooks(page);

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
          .delete(`${endpoint}/schedules/${id}`)
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
    <div className="w-full">
      <div className="overflow-x-auto">
        {getSchedules ? (
          <table className="items-center bg-transparent w-full border-collapse overflow-x-auto">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="px-6 text-gray-700 align-middle   py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-line font-semibold text-left">
                  Jam
                </th>
                <th className="px-6 text-gray-700 align-middle   py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-line font-semibold text-left">
                  Tanggal
                </th>
                <th className="px-6 text-gray-700 align-middle   py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-line font-semibold text-left">
                  Tim
                </th>
                <th className="px-6 text-gray-700 align-middle   py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-line font-semibold text-left">
                  Nama Kegiatan
                </th>
                <th className="px-6 text-gray-700 align-middle   py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-line font-semibold text-center">
                  Link atau Undangan
                </th>
                <th className="px-6 text-gray-700 align-middle   py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-line font-semibold text-left">
                  Keterangan
                </th>
                <th
                  className={`px-6  text-gray-700 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-line font-semibold text-center ${
                    typePage == "dashboard" ? "hidden" : ""
                  }`}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-700 ">
              {getSchedules.map((item, key) => (
                <tr className="border-b-2 border-[#89898]" key={key}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                    {item.startEvent} - {item.endEvent}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                    {moment(item.deadline).locale("id").format("MMMM Do YYYY")}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                    {typePage == "dashboard" ? (
                      <></>
                    ) : (
                      <button
                        className="bg-green-300 rounded-full w-[24px] h-[24px] font-bold flex items-center justify-center"
                        onClick={() => {
                          setdataSchedule(item);
                          setModalEdit(true);
                          setTypePopup("assign");
                        }}
                      >
                        <IoMdPersonAdd />
                      </button>
                    )}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                    {item.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
                    {item.keterangan == "online" ? (
                      <a
                        href={item.link}
                        target="_blank"
                        className="p-2 bg-blue-100 rounded"
                      >
                        <button>
                          <p>
                            <BiLogoZoom />
                          </p>
                        </button>
                      </a>
                    ) : (
                      <a
                        href={item.file}
                        target="_blank"
                        className="p-2 bg-green-200 rounded"
                      >
                        <button>
                          <p>
                            <FaFile />
                          </p>
                        </button>
                      </a>
                    )}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                    <p
                      className={`w-fit px-3 py-2 rounded ${
                        item.keterangan == "online"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } `}
                    >
                      {item.keterangan}
                    </p>
                  </td>
                  <td
                    className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-line p-4 text-center ${
                      typePage == "dashboard" ? "hidden" : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setdataSchedule(item);
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
      </div>
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
      <ScheduleEditPopUp
        data={dataSchedule}
        showModal={modalEdit}
        setType={typePopup}
        setShowModal={setModalEdit}
        SetChange={SetChange}
      />
    </div>
  );
};
