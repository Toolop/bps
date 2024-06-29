import { FaUserCircle } from "react-icons/fa";
import { GetDataUserDetail } from "../../../hooks/Userhooks/getDetailUser";
import EditRegisterForm from "../../atoms/form/editRegister";

const ProfileModal = ({ showModal, setShowModal }) => {
  const { dataUser, SetChange } = GetDataUserDetail();

  const doNothing = () => {};

  return (
    <>
      {showModal ? (
        <>
          <div className="flex h-fit w-full lg:w-1/2 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 m-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-w-xl">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded ">
                <h5>Profile</h5>
                <button className="w-100 h-100" onClick={() => setShowModal()}>
                  <span className="text-black p-5 rounded-full">x</span>
                </button>
              </div>
              <div className="relative p-6 flex flex-col items-center justify-center mt-[-10px] gap-5 w-full">
                <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-between">
                  <FaUserCircle className="w-full h-full" />
                </div>
                <EditRegisterForm
                  setShowModal={doNothing}
                  data={dataUser}
                  SetChange={SetChange}
                  typePage={"profile"}
                />
                {/* <div className="flex gap-3 flex-col">
                  <div className="w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500 "
                      {...register("email", { required: true, maxLength: 50 })}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-600">email perlu diisi</p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500 "
                      {...register("fullName", {
                        required: true,
                        maxLength: 100,
                      })}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <p className="text-red-600">Name perlu diisi</p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <div className="flex">
                      <input
                        className="border rounded-lg w-full py-3 px-2 text-gray-700 leading-tight focus:invalid:border-pink-500  "
                        type={type}
                        {...register("password", {
                          required: true,
                          maxLength: 80,
                        })}
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
                </div>

                <button className="m-auto bg-primary p-3 rounded-lg text-white">
                  Edit Profile
                </button> */}
              </div>
            </div>
          </div>

          <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[49] outline-none focus:outline-none bg-black bg-opacity-10 blur-3xl"
            onClick={() => setShowModal()}
          ></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ProfileModal;
