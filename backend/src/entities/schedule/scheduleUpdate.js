const schduleUpdateEntity = (name, file, link, deadline, typeScheduleId) => {
  return {
    name,
    file,
    link,
    deadline,
    typeScheduleId,
  };
};
module.exports = { schduleUpdateEntity };
