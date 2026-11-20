
"use client";

import { useActionState, useTransition } from "react";
import { createIssue } from "@/app/actions/issueActions";
import SubmitButton from "@/components/SubmitButton";

const initialState = {
  success: false,
  message: "",
};

export default function IssueForm({ addOptimisticIssue }) {
  const [state, formAction] = useActionState(
    createIssue,
    initialState
  );

  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData) {
    const newIssue = {
      id: `temp-${Date.now()}`,
      title: formData.get("title"),
      description: formData.get("description"),
      status: "OPEN",
      createdAt: new Date().toISOString(),
    };

    startTransition(async () => {
      addOptimisticIssue(newIssue);
      await formAction(formData);
    });
  }

  return (
    <form action={handleSubmit} className="issue-form">
      <div className="form-group">
        <label htmlFor="title">Issue Title</label>
        <input
          id="title"
          name="title"
          placeholder="Enter issue title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your issue"
          required
        />
      </div>

      <SubmitButton />

      {isPending && <p>Creating issue...</p>}

      {state.message && (
        <p className={`form-message ${
          state.success ? "success-message" : "error-message"
        }`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
