import EditRegisterForm from "../../atoms/form/editRegister";

const UserEditPopUp = ({ showModal, setShowModal, data, SetChange }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="flex w-full h-fit lg:w-1/2 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-fit m-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-w-xl">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded ">
                <h5>User Register</h5>
                <button className="w-100 h-100" onClick={() => setShowModal()}>
                  <span className="text-black p-5 rounded-full">x</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto mt-[-10px] w-full">
                <EditRegisterForm
                  setShowModal={setShowModal}
                  data={data}
                  SetChange={SetChange}
                />
              </div>
            </div>
          </div>

          <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-1 outline-none focus:outline-none bg-black bg-opacity-10 blur-3xl"
            onClick={() => setShowModal()}
          ></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UserEditPopUp;
