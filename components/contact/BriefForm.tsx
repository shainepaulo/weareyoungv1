"use client";

import { useState, type FormEvent } from "react";
import { DatePicker } from "./DatePicker";

const MESSAGE_MAX = 500;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "success" | "error";

export function BriefForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const briefUrl = String(data.get("briefUrl") ?? "").trim();
    const nextErrors: Record<string, string> = {};

    if (!EMAIL_RE.test(email)) {
      nextErrors.email = "Invalid email";
    }

    if (briefUrl) {
      try {
        new URL(briefUrl);
      } catch {
        nextErrors.briefUrl = "Invalid URL";
      }
    }

    if (message.length > MESSAGE_MAX) {
      nextErrors.message = `${MESSAGE_MAX} characters max`;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    console.log("Brief submitted", Object.fromEntries(data.entries()));
    setStatus("success");
    form.reset();
    setMessage("");
  }

  return (
    <form className="brief-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label className="mono-xs muted" htmlFor="brief-name">
          Name &amp; company
        </label>
        <input className="field__control" id="brief-name" name="name" type="text" required />
      </div>

      <div className="field">
        <label className="mono-xs muted" htmlFor="brief-email">
          Email
        </label>
        <input className="field__control" id="brief-email" name="email" type="email" required />
        {errors.email && <span className="field__error mono-xs">{errors.email}</span>}
      </div>

      <div className="field">
        <label className="mono-xs muted" htmlFor="brief-project">
          Project
        </label>
        <input className="field__control" id="brief-project" name="project" type="text" required />
      </div>

      <div className="field">
        <label className="mono-xs muted" htmlFor="brief-deadline">
          Deadline
        </label>
        <DatePicker id="brief-deadline" name="deadline" />
      </div>

      <div className="field">
        <label className="mono-xs muted" htmlFor="brief-budget">
          Budget
        </label>
        <input className="field__control" id="brief-budget" name="budget" type="text" />
      </div>

      <div className="field">
        <label className="mono-xs muted" htmlFor="brief-message">
          Message
        </label>
        <textarea
          className="field__control field__control--area"
          id="brief-message"
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <span className="field__counter mono-xs muted">
          {message.length} / {MESSAGE_MAX}
        </span>
        {errors.message && <span className="field__error mono-xs">{errors.message}</span>}
      </div>

      <div className="field">
        <label className="mono-xs muted" htmlFor="brief-url">
          Brief link
        </label>
        <input className="field__control" id="brief-url" name="briefUrl" type="url" />
        {errors.briefUrl && <span className="field__error mono-xs">{errors.briefUrl}</span>}
      </div>

      <button className="btn" type="submit">
        Send <span className="dot" />
      </button>

      {status === "success" && (
        <p className="field__status mono-xs accent" role="status">
          Brief received.
        </p>
      )}
    </form>
  );
}
