import DailyEditForm from "../../atoms/form/dailyActivity";
import IndeksEditForm from "../../atoms/form/indeks";
import InspeksiEditForm from "../../atoms/form/inspeksi";
import PemakaianEditForm from "../../atoms/form/pemakaian";
import PeralatanEditForm from "../../atoms/form/peralatan";

const DailyActivityPopUp = ({
  showModal,
  setShowModal,
  data,
  type,
  title,
  setChange,
}) => {
  const showPage = () => {
    if (type == 1) {
      return (
        <DailyEditForm
          setShowModal={setShowModal}
          data={data}
          setChange={setChange}
        />
      );
    } else if (type == 2) {
      return (
        <IndeksEditForm
          setShowModal={setShowModal}
          data={data}
          setChange={setChange}
        />
      );
    } else if (type == 3) {
      return (
        <InspeksiEditForm
          setShowModal={setShowModal}
          data={data}
          setChange={setChange}
        />
      );
    } else if (type == 4) {
      return (
        <PemakaianEditForm
          setShowModal={setShowModal}
          data={data}
          setChange={setChange}
        />
      );
    } else if (type == 5) {
      return (
        <PeralatanEditForm
          setShowModal={setShowModal}
          data={data}
          setChange={setChange}
        />
      );
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="flex w-full h-full lg:w-1/2 justify-center items-start overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-fit m-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-w-xl">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded ">
                <h5>{title}</h5>
                <button className="w-100 h-100" onClick={() => setShowModal()}>
                  <span className="text-black p-5 rounded-full">x</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto mt-[-10px] w-full">
                {showPage()}
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

export default DailyActivityPopUp;
