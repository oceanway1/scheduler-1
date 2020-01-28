import "components/Appointment";
import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import bookInterview from "components/Application"
import Confirm from "components/Appointment/Confirm"

const SAVING = "SAVING"
const DELETE = "DELETE";
const EDIT = "EDIT";
const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM"
const DELETING = "DELETING"


export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    // console.log(interview)
    props.bookInterview(props.id, interview).then(() => transition(SHOW))

  }

  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(props.id).then(() => transition(EMPTY))

  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log("oh my props!", props.interview, mode);
  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={Object.values(props.interviewers)}
          onCancel={() => back()}
          onSave={save}

        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete the appointment ?"
          onCancel={() => back()}
          onConfirm={destroy}
        />
      )}


    </article>
  )

}


