const userEntity = (
  id,
  username,
  password,
  email,
  nama,
  teamId,
  roleId,
  nip,
  ttl
) => {
  return {
    id,
    username,
    password,
    email,
    nama,
    teamId,
    roleId,
    nip,
    ttl,
  };
};
module.exports = { userEntity };
