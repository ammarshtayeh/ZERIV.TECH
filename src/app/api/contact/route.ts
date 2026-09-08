import { NextResponse } from "next/server";
import {
  validateContactForm,
  submitContactMock,
  type ContactFormData,
} from "@/lib/contact";

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    const errors = validateContactForm(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: "Please correct the highlighted fields.", errors },
        { status: 400 }
      );
    }

    const entry = await submitContactMock(body);

    return NextResponse.json(
      {
        message: "Message received.",
        data: { id: entry.id, created_at: entry.created_at },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: "Server error. Please try again." }, { status: 500 });
  }
}
