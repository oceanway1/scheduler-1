
import axios from "axios"
import { useReducer, useEffect } from "react";
import { findDayByAppointment } from "../helpers/selectors"
export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const UPDATE_SPOTS = "UPDATE_SPOTS";


  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.value
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
          interviewersDay: action.interviewersDay
        }

      case SET_INTERVIEW:
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview ? { ...action.interview } : null
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        return {
          ...state, appointments
        }

      case UPDATE_SPOTS:
        const dayId = findDayByAppointment(action.id, state);
        const appointmentId = state.days[dayId].appointments;
        let spotsRemaining = 0;
        for (let i = 0; i < appointmentId.length; i++) {
          if (!state.appointments[appointmentId[i]].interview) {
            spotsRemaining += 1;
          }
        }
        return {
          ...state,
          days: state.days.map((item, index) => {
            if (index !== dayId) {
              return item
            } else {
              return {
                ...item,
                spots: spotsRemaining
              }
            }
          })
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
    interviewers: {}
  });


  // Set the current day
  function setDay(day) {
    dispatch({ type: SET_DAY, value: day })
  };

  // adds interview to our api and updates the local state
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, interview: interview, id: id }))
      .then(() => dispatch({ type: UPDATE_SPOTS, id: id }))

  }
  // delete interview from our api and removes it on the state
  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`, { interview: null })
      .then(() => dispatch({ type: SET_INTERVIEW, interview: interview, id: id }))
      .then(() => dispatch({ type: UPDATE_SPOTS, id: id }))
  }

  // Gets data of days, appointment, interviewers from our API
  useEffect(() => {
    const day = axios.get(`/api/days`)
    const appointment = axios.get(`/api/appointments`)
    const interviewers = axios.get(`/api/interviewers`)

    Promise.all([
      day,
      appointment,
      interviewers
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, []);

  return {
    setDay,
    state,
    bookInterview,
    cancelInterview
  }
}
