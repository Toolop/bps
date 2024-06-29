const submitUser = (data) => {
  setLoading(true);
  try {
    axios
      .post(`${endpoint}/login`, data)
      .then((result) => {
        setLoading(false);

        if (result.data.role) {
          Swal.fire({
            title: "Login Berhasil!",
            icon: "success",
          });
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("role", result.data.role);
          navigate(`/${result.data.role}/Dashboard`);
        } else {
          Swal.fire({
            title: "Login Gagall!",
            text: "tidak memiliki authorisasi silahkan hubungi admin",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        reset({
          password: "",
        });

        setLoading(false);
        Swal.fire({
          title: "Login Gagal!",
          text: "email atau password salah",
          icon: "error",
        });
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
