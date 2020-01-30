export const getInterview = (state, interview) => {
  if (!interview) {
    return null
  }
  else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer]
    const result = { student, interviewer }
    return result;
  }
}

export const getInterviewersForDay = (state, day) => {
  const result = [];
  const getInterviewersDay = state.days
    .filter(states => states.name === day)
    .map(states => states.interviewers)
    .reduce((acc, val) => acc.concat(val), []);
  getInterviewersDay.forEach(states => {
    result.push(state.interviewers[states]);
  });
  return result;
};

//returns all of the interviews for that given day
export const getAppointmentsForDay = (state, day) => {
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

export function findDayByAppointment(id, state) {
  for (let i = 0; i < state.days.length; i++) {
    for (let result of state.days[i].appointments) {
      if (id === result) {
        return i;
      }
    }
  }
};

