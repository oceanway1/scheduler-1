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


const getInterview = (state, interview) => {
  // let result = {};
  if (!interview) {
    return null
  }
  const student = interview.student;
  // result.student = interview.student;
  // console.log(state)
  const interviewer = state.interviewers[interview.interviewer]
  // result.interviewer = state.interviews[interview.interviewer]
  const result = {student, interviewer}
  // console.log(result)
  return result;
}



module.exports = {
  getAppointmentsForDay,
  getInterview
}