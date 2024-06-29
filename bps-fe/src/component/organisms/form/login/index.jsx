import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { endpoint } from "../../../../helper/api/baseUrl";

const LoginInput = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(0);
  const navigate = useNavigate();

  const submitUser = (data) => {
    setLoading(true);
    try {
      axios
        .post(`${endpoint}/login`, data)
        .then((result) => {
          setLoading(false);

          Swal.fire({
            title: "Login Berhasil!",
            icon: "success",
          });

          localStorage.setItem("token", result.data.data.accessToken);
          localStorage.setItem("role", result.data.data.role);
          navigate(`/${result.data.data.role}/Dashboard`);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status == 403) {
            Swal.fire({
              title: "Login Gagal!",
              text: "Tidak memiliki hak akses silahkan hubungi admin",
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Login Gagal!",
              text: "email atau password salah",
              icon: "error",
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePassword = () => {
    if (icon == 1) {
      setType("password");
      setIcon(0);
    } else {
      setType("text");
      setIcon(1);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleNow = localStorage.getItem("role");
    if (token == null || roleNow == null) {
      navigate("/login");
    } else {
      navigate(`/${roleNow}/dashboard`);
    }
  }, []);

  return (
    <form
      className="w-full mt-5 flex flex-col gap-5"
      onSubmit={handleSubmit(submitUser)}
    >
      <div className="w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500 "
          {...register("email", { required: true, maxLength: 100 })}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-600">email perlu diisi</p>}
      </div>
      <div className="w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <div className="flex">
          <input
            className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500  "
            type={type}
            {...register("password", { required: true, maxLength: 100 })}
            placeholder="Password"
          />
          <span
            className="flex justify-around items-center text-gray"
            onClick={handlePassword}
          >
            {icon == 0 ? (
              <FaEyeSlash class="absolute mr-10" />
            ) : (
              <FaEye class="absolute mr-10" />
            )}
          </span>
        </div>

        {errors.password && (
          <p className="text-red-600">password perlu diisi</p>
        )}
      </div>
      <div className="w-full mt-3 flex flex-col justify-center items-center">
        {!isLoading ? (
          <button
            className="bg-primary hover:bg-[#075392] text-white font-bold py-3 w-full rounded-lg focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
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

export default LoginInput;
