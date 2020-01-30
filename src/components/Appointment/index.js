import "components/Appointment";
import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"


const SAVING = "SAVING"
const DELETE = "DELETE";
const EDIT = "EDIT";
const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM"
const DELETING = "DELETING"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"



export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview
}) {

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  // Save data of student name and interview name when creating an interview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return interview;
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => {
            transition(SAVING);
            if (name && interviewer) {
              bookInterview(id, save(name, interviewer))
                .then(() => transition(SHOW))
                .catch(error => transition(ERROR_SAVE, true))
            } else {
              transition(ERROR_SAVE)
            }
          }}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={() => {
            transition(DELETING, true)
            cancelInterview(id)
              .then(() => transition(EMPTY))
              .catch(error => transition(ERROR_DELETE, true));
          }
          }
          message="Are you sure you would like to delete the appointment ?"
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}

      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          name={interview.student}
          interviewer={interview.interviewer.id}
          onCancel={() => back()}
          onSave={(name, interviewer) => {
            transition(SAVING);
            bookInterview(id, save(name, interviewer))
              .then(() => transition(SHOW))
              .catch(error => transition(ERROR_SAVE))
          }}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Error saving"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment"
          onClose={() => back(SHOW)}
        />
      )}
    </article>
  )
}


