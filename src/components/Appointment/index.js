import "components/Appointment";
import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import bookInterview from "components/Application"

const SAVING = "SAVING"
const DELETE = "DELETE";
const EDIT = "EDIT";
const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";



export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    console.log(interview)
    props.bookInterview(props.id, interview).then(()=> transition(SHOW))
    
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
          onDelete={() => transition(DELETE)}
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

    </article>
  )

}


