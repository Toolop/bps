const userEntityUpdate = (username, email, nama, teamId, roleId) => {
  return {
    username,

    email,
    nama,
    teamId,
    roleId,
  };
};
module.exports = { userEntityUpdate };
