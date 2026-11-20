
"use client";

import { useActionState } from "react";
import { deleteIssue } from "@/app/actions/issueActions";

const initialState = {
  success: false,
  message: "",
};

export default function DeleteIssueButton({ issueId }) {
  const [state, formAction, pending] = useActionState(
    deleteIssue,
    initialState
  );

  function handleSubmit(event) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="delete-issue-form"
    >
      <input type="hidden" name="issueId" value={issueId} />

      <button
        type="submit"
        disabled={pending}
        className="btn btn-danger"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>

      {state.message && (
        <p
          className={`form-message ${
            state.success ? "success-message" : "error-message"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
