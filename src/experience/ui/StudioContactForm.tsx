"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
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

export function StudioContactForm() {
  const { t } = useLocale();
  const [form, setForm] = useState<ContactFormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (data: ContactFormData) => {
    const next: Partial<Record<keyof ContactFormData, string>> = {};
    if (!data.name.trim() || data.name.trim().length < 2) next.name = t("contact.required");
    if (!data.email.trim()) next.email = t("contact.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = t("contact.required");
    if (!data.message.trim() || data.message.trim().length < 10) next.message = t("contact.required");
    return next;
  };

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
      setErrorMessage(t("contact.error"));
    }
  };

  if (status === "success") {
    return (
      <div className="xp-form xp-form--success" role="status">
        <p className="xp-label">{t("contact.successTitle")}</p>
        <h3 className="xp-form__title">{t("contact.successTitle")}</h3>
        <p className="xp-form__copy">{t("contact.successCopy")}</p>
        <button type="button" className="xp-form__btn" onClick={() => setStatus("idle")}>
          {t("contact.send")}
        </button>
      </div>
    );
  }

  return (
    <form className="xp-form" onSubmit={onSubmit} noValidate>
      <div className="xp-form__grid">
        <label className="xp-form__field">
          <span className="xp-label">{t("contact.name")}</span>
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
          <span className="xp-label">{t("contact.email")}</span>
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
          <span className="xp-label">{t("contact.phone")}</span>
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
          <span className="xp-label">{t("contact.type")}</span>
          <select
            className="xp-form__input"
            name="service_type"
            value={form.service_type}
            onChange={(e) => set("service_type", e.target.value)}
          >
            <option value="">—</option>
            {capabilities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="xp-form__field">
          <span className="xp-label">{t("contact.budget")}</span>
          <select
            className="xp-form__input"
            name="budget_range"
            value={form.budget_range}
            onChange={(e) => set("budget_range", e.target.value)}
          >
            <option value="">—</option>
            <option value="under-5k">Under $5k</option>
            <option value="5k-15k">$5k – $15k</option>
            <option value="15k-40k">$15k – $40k</option>
            <option value="40k-plus">$40k+</option>
          </select>
        </label>
      </div>

      <label className="xp-form__field">
        <span className="xp-label">{t("contact.message")}</span>
        <textarea
          className="xp-form__input xp-form__textarea"
          name="message"
          rows={6}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="xp-form__error">{errors.message}</span>}
      </label>

      {status === "error" && <p className="xp-form__error">{errorMessage}</p>}

      <button type="submit" className="xp-form__btn" disabled={status === "loading"}>
        {status === "loading" ? t("contact.sending") : t("contact.send")}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
