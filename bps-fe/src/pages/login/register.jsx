import LoadingBar from "react-top-loading-bar";
import logoApp from "/LogoApp.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../component/atoms/form";

function Register() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={400}
      />

      <div className="min-h-screen flex md:items-start justify-center">
        <div className="w-full md:w-3/4 lg:w-1/4 lg:min-w-[500px] lg:max-w-[1000px] flex items-center justify-center flex-col-reverse md:flex-col">
          <div className="w-full flex items-center justify-center">
            <img src={logoApp} alt="logo perusahaan" className="w-1/6 m-5" />
          </div>
          <div className="w-full md:drop-shadow-lg bg-white p-10 flex justify-center items-center flex-col rounded-lg ">
            <h3 className="text-black mb-10">register</h3>
            <RegisterForm />
            <p className="w-full text-center mt-3">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-primary">
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
