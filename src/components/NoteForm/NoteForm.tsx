import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useId } from "react";
import css from "./NoteForm.module.css";
import type { NewNote } from "../../types/note";
import { createNote } from "../../services/noteService";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must include at least 3 symbols")
    .max(50, "Title can include up to 50 symbols only")
    .required("Title is required"),
  content: Yup.string().max(500, "Content can include up to 500 symbols only"),
  tag: Yup.string().required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (note: NewNote) => createNote(note),
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast(`The '${newNote.title}' note has been added!`);
      onClose();
    },
    onError: () =>
      toast("Could not save changes, please try again...", {
        style: {
          borderColor: "#d32f2f",
        },
      }),
  });

  const handleCancel = () => onClose();
  const handleSubmit = (values: NewNote, actions: FormikHelpers<NewNote>) => {
    mutation.mutate(values, {
      onSuccess: () => actions.resetForm(),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id={`${fieldId}-content`}
            as="textarea"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            id={`${fieldId}-tag`}
            as="select"
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
