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
        { message: "يرجى تصحيح الأخطاء في النموذج", errors },
        { status: 400 }
      );
    }

    const entry = await submitContactMock(body);

    return NextResponse.json(
      {
        message: "تم استلام رسالتك بنجاح",
        data: { id: entry.id, created_at: entry.created_at },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "حدث خطأ في الخادم" },
      { status: 500 }
    );
  }
}
