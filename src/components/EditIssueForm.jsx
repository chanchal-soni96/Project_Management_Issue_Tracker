"use client";

import { useActionState, useState } from "react";
import { updateIssue } from "@/app/actions/issueActions";

const initialState = {
  success: false,
  message: "",
};

export default function EditIssueForm({ issue }) {
  const [isEditing, setIsEditing] = useState(false);

  const [state, formAction, pending] = useActionState(
    updateIssue,
    initialState,
  );

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="issue-edit-button"
      >
        <span>✎</span> Edit
      </button>
    );
  }

  return (
    <form action={formAction} className="edit-issue-form">
      <input type="hidden" name="issueId" value={issue.id} />
      <input type="hidden" name="version" value={issue.version} />
      <div className="form-group">
        <label htmlFor={`edit-title-${issue.id}`}>Issue Title</label>
        <input
          id={`edit-title-${issue.id}`}
          type="text"
          name="title"
          defaultValue={issue.title}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor={`edit-description-${issue.id}`}>Description</label>
        <textarea
          id={`edit-description-${issue.id}`}
          name="description"
          defaultValue={issue.description}
          required
        />
      </div>

      {state.message && (
        <p
          className={`form-message ${
            state.success ? "success-message" : "error-message"
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="edit-form-actions">
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
