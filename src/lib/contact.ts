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
    errors.name = "Please enter your name.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (data.phone && !/^[\d\s+\-()]{7,20}$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!data.message.trim()) {
    errors.message = "Please describe your project.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Please share a little more (at least 10 characters).";
  }

  return errors;
}

export async function submitContactMock(data: ContactFormData): Promise<ContactRequest> {
  await new Promise((resolve) => setTimeout(resolve, 900));

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
