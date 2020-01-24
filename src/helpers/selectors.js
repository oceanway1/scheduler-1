const getAppointmentsForDay = (state, day) => {
  const appointmentsDay = state.days
    .filter(states => states.name === day)
    .map(states => states.appointments)
    .reduce((acc, val) => acc.concat(val), []);
  const filteredDay = [];
  appointmentsDay.forEach(states => {
    filteredDay.push(state.appointments[states]);
  });
  return filteredDay;
};


const getInterView = (state, interview) => {
  let result = {};
  if (!interview) {
    return null
  }
  result.student = interview.student;
  console.log(state)
  result.interviewer = state.interviews[interview.interviewer]
  
  return result;
}



module.exports = {
  getAppointmentsForDay,
  getInterView
}