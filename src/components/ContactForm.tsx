"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceTypes, budgetRanges } from "@/lib/mock-data";
import type { ContactFormData } from "@/lib/contact";

type FormStatus = "idle" | "loading" | "success" | "error";

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  service_type: "",
  budget_range: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setErrorMessage(data.message || "حدث خطأ، يرجى المحاولة مرة أخرى.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setErrorMessage("تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.");
      setStatus("error");
    }
  };

  const isDisabled = status === "loading" || status === "success";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">الاسم *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="اسمك الكامل"
            disabled={isDisabled}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-zeriv-red">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني *</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="hello@example.com"
            disabled={isDisabled}
            dir="ltr"
            className="text-left"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-zeriv-red">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+972 59 553 7190"
            disabled={isDisabled}
            dir="ltr"
            className="text-left"
          />
          {errors.phone && (
            <p className="text-xs text-zeriv-red">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>نوع الخدمة</Label>
          <Select
            value={form.service_type}
            onValueChange={(v) => updateField("service_type", v)}
            disabled={isDisabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الخدمة" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>الميزانية التقريبية</Label>
        <Select
          value={form.budget_range}
          onValueChange={(v) => updateField("budget_range", v)}
          disabled={isDisabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر النطاق" />
          </SelectTrigger>
          <SelectContent>
            {budgetRanges.map((range) => (
              <SelectItem key={range} value={range}>{range}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">الرسالة *</Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="أخبرنا عن مشروعك..."
          disabled={isDisabled}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-xs text-zeriv-red">{errors.message}</p>
        )}
      </div>

      {status === "success" && (
        <div className="flex items-center gap-2 rounded-xl border border-zeriv-green/30 bg-zeriv-green/10 p-4 text-sm text-zeriv-green">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</span>
        </div>
      )}

      {status === "error" && errorMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-zeriv-red/30 bg-zeriv-red/10 p-4 text-sm text-zeriv-red">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isDisabled} className="w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          "إرسال الرسالة"
        )}
      </Button>
    </form>
  );
}
