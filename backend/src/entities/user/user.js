const userEntity = (id, username, password, email, nama, teamId, roleId) => {
  return {
    id,
    username,
    password,
    email,
    nama,
    teamId,
    roleId,
  };
};
module.exports = { userEntity };
