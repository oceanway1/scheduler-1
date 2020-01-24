import React, { useState, useEffect } from "react";
import Appointment from "../components/Appointment"
import "components/Application.scss";
import DayList from "components/DayList"
const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Luke N",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Catherine S",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "PoPo N",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },

];


export default function Application(props) {

  const setDay = day => setState({...state, day})
  const setDays = days => setState({...state, days})
  // const [day, setDay] = useState("");
  // const [days, setDays] = useState([])
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  useEffect(() => {
    axios.get(`/api/days`).then((response) => {
      console.log(response)
      setDays(response.data)
      // const day = axios.get("api/days");
      
    })
  },[]);
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
        {appointments.map(appointments => {
          return (
            <Appointment
              key={appointments.id}
              id={appointments.id}
              time={appointments.time}
              interview={appointments.interview}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
