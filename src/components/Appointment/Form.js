import React, { useState } from "react";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList"
import InterviewerListItem from "components/InterviewerListItem"
import Button from "components/Button";


export default function Form(props) {
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const { interviewers, onCancel, onSave } = props
  function reset() {
    setName("")
    setInterviewer(null)
  }
  function cancel() {
    reset()
    onCancel()
  }
  function save() {
    onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger
            onClick={cancel}>Cancel</Button>
          <Button confirm
            onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
}