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

const getInterviewersForDay = (state, day) => {
  const getInterviewersDay = state.days
    .filter(states => states.name === day)
    .map(states => states.interviewers)
    .reduce((acc, val) => acc.concat(val), []);
  const result = [];
  getInterviewersDay.forEach(states => {
    result.push(state.interviewers[states]);
  });
  return result;
};


const getInterview = (state, interview) => {
  // let result = {};
  if (!interview) {
    return null
  }
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer]
  const result = {student, interviewer}
  return result;
}



module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
}