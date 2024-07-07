const userEntity = (
  id,
  username,
  password,
  email,
  nama,
  teamId,
  roleId,
  nip,
  ttl,
  status
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
    status,
  };
};
module.exports = { userEntity };
