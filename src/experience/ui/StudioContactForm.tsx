"use client";

import { useState, type FormEvent } from "react";
import type { ContactFormData } from "@/lib/contact";
import { capabilities } from "../data/capabilities-options";

type Status = "idle" | "loading" | "success" | "error";

const initial: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  service_type: "",
  budget_range: "",
  message: "",
};

function validate(data: ContactFormData) {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  if (!data.name.trim() || data.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!data.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email.";
  if (data.phone && !/^[\d\s+\-()]{7,20}$/.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "Tell us a little more about the project (at least 10 characters).";
  }
  return errors;
}

export function StudioContactForm() {
  const [form, setForm] = useState<ContactFormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const set = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please email us directly or try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="xp-form xp-form--success" role="status">
        <p className="xp-label">Received</p>
        <h3 className="xp-form__title">Thank you.</h3>
        <p className="xp-form__copy">We&apos;ll review your note and get back to you soon.</p>
        <button type="button" className="xp-form__btn" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="xp-form" onSubmit={onSubmit} noValidate>
      <div className="xp-form__grid">
        <label className="xp-form__field">
          <span className="xp-label">Name</span>
          <input
            className="xp-form__input"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="xp-form__error">{errors.name}</span>}
        </label>

        <label className="xp-form__field">
          <span className="xp-label">Email</span>
          <input
            className="xp-form__input"
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="xp-form__error">{errors.email}</span>}
        </label>

        <label className="xp-form__field">
          <span className="xp-label">Phone</span>
          <input
            className="xp-form__input"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <span className="xp-form__error">{errors.phone}</span>}
        </label>

        <label className="xp-form__field">
          <span className="xp-label">Project type</span>
          <select
            className="xp-form__input"
            name="service_type"
            value={form.service_type}
            onChange={(e) => set("service_type", e.target.value)}
          >
            <option value="">Select</option>
            {capabilities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="xp-form__field">
          <span className="xp-label">Budget range</span>
          <select
            className="xp-form__input"
            name="budget_range"
            value={form.budget_range}
            onChange={(e) => set("budget_range", e.target.value)}
          >
            <option value="">Prefer not to say</option>
            <option value="under-5k">Under $5k</option>
            <option value="5k-15k">$5k – $15k</option>
            <option value="15k-40k">$15k – $40k</option>
            <option value="40k-plus">$40k+</option>
          </select>
        </label>
      </div>

      <label className="xp-form__field">
        <span className="xp-label">Project description</span>
        <textarea
          className="xp-form__input xp-form__textarea"
          name="message"
          rows={6}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          placeholder="What are you building? Goals, timeline, links — whatever helps."
        />
        {errors.message && <span className="xp-form__error">{errors.message}</span>}
      </label>

      {status === "error" && <p className="xp-form__error">{errorMessage}</p>}

      <button type="submit" className="xp-form__btn" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send project brief"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
