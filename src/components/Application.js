import React, { useState, useEffect } from "react";
import Appointment from "../components/Appointment"
import "components/Application.scss";
import DayList from "components/DayList"
import {getAppointmentsForDay, getInterview} from "../helpers/selectors"
const axios = require('axios');



export default function Application(props) {

  const setDay = day => setState({ ...state, day })
  // const setDays = days => setState({ ...state, days })
  // setState(prev => ({ ...prev, days }));

  // const [day, setDay] = useState("");
  // const [days, setDays] = useState([])
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {}
  });
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log(interview)
    // const interviewer = getInterview(appointment.interviewer)
    return (
      <Appointment
        key={appointments.id}
        id={appointments.id}
        time={appointments.time}
        interview={interview}

      />
    )
  })


  useEffect(() => {
    // axios.get(`/api/days`).then((response) => {
    //   console.log(response)
    //   setDays(response.data)
    //   // const day = axios.get("api/days");
    const day = axios.get(`/api/days`)
    const appointment = axios.get(`/api/appointments`)
    const interview = axios.get(`/api/interviewers`)
    Promise.all([
      Promise.resolve(day),
      Promise.resolve(appointment),
      Promise.resolve(interview)
    ]).then((all) => {
      const [day, appointment] = all;
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviews: all[2].data }));
      console.log(day, appointment, interview);
    });
  },[])

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
