import React, { useState, useEffect } from "react";
import Appointment from "../components/Appointment"
import "components/Application.scss";
import DayList from "components/DayList"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"
import axios from "axios"

export default function Application(props) {
  const setDay = day => setState({ ...state, day })

  useEffect(() => {
    // axios.get(`/api/days`).then((response) => {
    //   console.log(response)
    //   setDays(response.data)
    //   // const day = axios.get("api/days");
    const day = axios.get(`/api/days`)
    const appointment = axios.get(`/api/appointments`)
    const interviewers = axios.get(`/api/interviewers`)

    Promise.all([
      day,
      appointment,
      interviewers
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      // console.log(day, appointment, interviewers);
    });
  }, [])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
    interviewers: {}
  });


  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        console.log('id', id, 'interview', interview)
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments
        });
      })
  }

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    if (!interview) 
    console.log("helll---________", interviewers)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        interviewers={interviewers}


      />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
