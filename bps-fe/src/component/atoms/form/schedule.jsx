import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { endpoint } from "../../../helper/api/baseUrl";
import { scheduleType } from "../../../data/typeSchedule";
import { FileUploader } from "react-drag-drop-files";

const ScheduleForm = ({ setShowModal, typePage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState("");
  const [dataKeterangan, setDataKeterangan] = useState("");
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");
  const handleChange = (file) => {
    setFile(file);
  };

  const submitSchedule = async (data) => {
    setLoading(true);
    data.keterangan = dataKeterangan;
    data.file = file;

    try {
      await axios
        .post(`${endpoint}/schedules`, data, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setLoading(false);
          Swal.fire({
            title: "Menambah Berhasil!",
            icon: "success",
          });
          setShowModal();
        })
        .catch((err) => {
          reset({
            password: "",
          });
          setLoading(false);
          Swal.fire({
            title: "Menambah Gagal!",
            text: "field ada yang salah",
            icon: "error",
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="w-full h-fit flex flex-col gap-5  overflow-y-scroll"
      onSubmit={handleSubmit(submitSchedule)}
    >
      <div className="w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nama Kegiatan
        </label>
        <input
          className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500 "
          {...register("name", { required: true, maxLength: 80 })}
          placeholder="Name"
        />
        {errors.name && <p className="text-red-600">Name perlu diisi</p>}
      </div>
      <div className="w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tanggal Kegiatan
        </label>
        <input
          type="date"
          className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500 "
          {...register("deadline", { required: true, maxLength: 80 })}
          placeholder="Name"
        />
        {errors.deadline && (
          <p className="text-red-600">Tanggal Kegiatan perlu diisi</p>
        )}
      </div>
      <div className="flex gap-3">
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jam Mulai
          </label>
          <input
            className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500 "
            type="time"
            {...register("startEvent", { required: true, maxLength: 80 })}
            placeholder="Jam Mulai"
          />
          {errors.startEvent && (
            <p className="text-red-600">Jam mulai perlu diisi</p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jam Selesai
          </label>
          <input
            className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500 "
            type="time"
            {...register("endEvent", { required: true, maxLength: 80 })}
            placeholder="Jam Selesai"
          />
          {errors.endEvent && (
            <p className="text-red-600">Jam Selesai perlu diisi</p>
          )}
        </div>
      </div>

      <div className={` w-full flex-col`}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Keterangan
        </label>
        <select
          onChange={(e) => {
            setDataKeterangan(e.target.value);
          }}
          className={`text-[#737373] border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full py-3 px-1 `}
        >
          <option value="">Pilih Keterangan Kegiatan</option>
          {scheduleType.map((item, key) => (
            <option key={key}>{item}</option>
          ))}
        </select>
      </div>

      <div
        className={`w-full ${dataKeterangan == "online" ? "block" : "hidden"}`}
      >
        <label className={`block text-gray-700 text-sm font-bold mb-2`}>
          Link Kegiatan
        </label>
        <input
          className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500 "
          {...register("link", { maxLength: 200 })}
          placeholder="Link Kegiatan"
        />
        {errors.link && (
          <p className="text-red-600">Link Kegiatan perlu diisi</p>
        )}
      </div>
      <div
        className={`w-full ${dataKeterangan == "offline" ? "block" : "hidden"}`}
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          File Tambahan
        </label>
        <FileUploader handleChange={handleChange} name="file">
          <div className="border-2 border-dotted	border-primary p-20 flex flex-col justify-center align-center text-center">
            <p className="text-center">Drag & Drop to Upload File</p>
            <p className="w-100 text-center">OR</p>
            <p className="py-2 text-center cursor-pointer	 max-w-[150px] p rounded-lg  px-4 bg-primary mt-4 text-white m-auto">
              Browse File
            </p>
          </div>{" "}
        </FileUploader>
        <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      </div>

      <div className="w-full mt-3 flex flex-col justify-center items-center">
        {!isLoading ? (
          <button
            className="bg-primary hover:bg-[#075392] text-white font-bold py-3 w-full rounded-lg focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="w-full flex flex-row items-center justify-center text-white bg-[#045DA7]  py-3 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
          >
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
            Loading...
          </button>
        )}
      </div>
    </form>
  );
};

export default ScheduleForm;
