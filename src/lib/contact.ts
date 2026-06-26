import type { ContactRequest } from "./mock-data";
import { mockContactStore } from "./mock-data";

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  service_type?: string;
  budget_range?: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "الاسم مطلوب";
  } else if (data.name.trim().length < 2) {
    errors.name = "الاسم يجب أن يكون حرفين على الأقل";
  }

  if (!data.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "البريد الإلكتروني غير صالح";
  }

  if (data.phone && !/^[\d\s+\-()]{7,20}$/.test(data.phone)) {
    errors.phone = "رقم الهاتف غير صالح";
  }

  if (!data.message.trim()) {
    errors.message = "الرسالة مطلوبة";
  } else if (data.message.trim().length < 10) {
    errors.message = "الرسالة يجب أن تكون 10 أحرف على الأقل";
  }

  return errors;
}

export async function submitContactMock(
  data: ContactFormData
): Promise<ContactRequest> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const entry: ContactRequest = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim(),
    service_type: data.service_type,
    budget_range: data.budget_range,
    message: data.message.trim(),
    created_at: new Date().toISOString(),
  };

  mockContactStore.push(entry);
  return entry;
}

export function getMockContactRequests(): ContactRequest[] {
  return [...mockContactStore].reverse();
}
