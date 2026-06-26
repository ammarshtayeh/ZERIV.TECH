"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { Loader2, Terminal, ShieldAlert, CheckCircle } from "lucide-react";
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
  
  // Real-time terminal CLI logs state
  const [logs, setLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const addLog = (text: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev.slice(-12), `[${time}] ${text}`]);
  };

  useEffect(() => {
    // Initial console diagnostics boot logs
    setLogs([
      `[${new Date().toLocaleTimeString()}] SYS: MISSION_CONTROL initialized.`,
      `[${new Date().toLocaleTimeString()}] SYS: Awaiting input parameters...`,
    ]);
  }, []);

  useEffect(() => {
    // Scroll terminal to bottom
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    
    // Log key field interactions
    if (field === "name" && value.length === 1) {
      addLog("INPUT_CAPTURE: Capturing name string bytes...");
    } else if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        addLog("VALIDATING_EMAIL: Status [OK]");
      } else {
        addLog("VALIDATING_EMAIL: Status [PENDING_RFC_MATCH]");
      }
    } else if (field === "message" && value.length % 15 === 0 && value.length > 0) {
      addLog(`PAYLOAD_BODY: Message size [${value.length} bytes]`);
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSelectService = (val: string) => {
    setForm((prev) => ({ ...prev, service_type: val }));
    addLog(`MODULE_CORE: Snap service type [${val}]`);
  };

  const handleSelectBudget = (val: string) => {
    setForm((prev) => ({ ...prev, budget_range: val }));
    addLog(`FINANCE_ALLOC: Allocated budget segment [${val}]`);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    addLog("SYS: INIT_TRANSMISSION sequence triggered.");
    addLog("SYS: Stitching data packets...");

    try {
      addLog("CONNECTING: Requesting gateway socket tunnel...");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
          addLog("SYS: Transmission rejected. Validation [FAILED].");
        }
        setErrorMessage(data.message || "حدث خطأ، يرجى المحاولة مرة أخرى.");
        setStatus("error");
        addLog(`SYS: Error response captured: [Code ${res.status}]`);
        return;
      }

      setStatus("success");
      setForm(initialForm);
      addLog("SYS: Transmission [SUCCESS]. Response code 200.");
      addLog("SYS: Channel closed. Awaiting response loop.");
    } catch {
      setErrorMessage("تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.");
      setStatus("error");
      addLog("CONNECTING: Socket connection timeout. Server unreachable.");
    }
  };

  const isDisabled = status === "loading" || status === "success";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-stretch text-right" dir="rtl">
      
      {/* Right Column (displayed first in RTL): Mission Control Input Form */}
      <div className="rounded-xl border border-zeriv-border bg-zeriv-card/30 p-6 sm:p-8 backdrop-blur-sm relative">
        {/* Corner ticks */}
        <span className="absolute top-2 left-2 text-[9px] font-mono text-zeriv-muted/30">+</span>
        <span className="absolute top-2 right-2 text-[9px] font-mono text-zeriv-muted/30">+</span>
        
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-mono text-zeriv-muted flex items-center gap-1.5 justify-end">
                <span>[INPUT_NAME]</span>الاسم *
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="اسمك الكامل"
                disabled={isDisabled}
                className="bg-black/30 border-zeriv-border hover:border-white/20 focus:border-zeriv-red text-right"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-[10px] text-zeriv-red font-mono">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-mono text-zeriv-muted flex items-center gap-1.5 justify-end">
                <span>[INPUT_EMAIL]</span>البريد الإلكتروني *
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="hello@example.com"
                disabled={isDisabled}
                dir="ltr"
                className="bg-black/30 border-zeriv-border hover:border-white/20 focus:border-zeriv-red text-left"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-[10px] text-zeriv-red font-mono text-left">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-mono text-zeriv-muted flex items-center gap-1.5 justify-end">
                <span>[INPUT_PHONE]</span>رقم الهاتف
              </Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+972 59 553 7190"
                disabled={isDisabled}
                dir="ltr"
                className="bg-black/30 border-zeriv-border hover:border-white/20 focus:border-zeriv-red text-left"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-mono text-zeriv-muted flex items-center gap-1.5 justify-end">
                <span>[SELECT_SERVICE]</span>نوع الخدمة
              </Label>
              <Select
                value={form.service_type}
                onValueChange={handleSelectService}
                disabled={isDisabled}
              >
                <SelectTrigger className="bg-black/30 border-zeriv-border text-right">
                  <SelectValue placeholder="اختر الخدمة المطلوبة" />
                </SelectTrigger>
                <SelectContent className="bg-zeriv-card border-zeriv-border">
                  {serviceTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-right justify-end">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-mono text-zeriv-muted flex items-center gap-1.5 justify-end">
              <span>[SELECT_BUDGET]</span>الميزانية التقريبية
            </Label>
            <Select
              value={form.budget_range}
              onValueChange={handleSelectBudget}
              disabled={isDisabled}
            >
              <SelectTrigger className="bg-black/30 border-zeriv-border text-right">
                <SelectValue placeholder="اختر النطاق المتوقع" />
              </SelectTrigger>
              <SelectContent className="bg-zeriv-card border-zeriv-border">
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range} className="text-right justify-end">{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs font-mono text-zeriv-muted flex items-center gap-1.5 justify-end">
              <span>[INPUT_PAYLOAD]</span>الرسالة تفصيلاً *
            </Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="أخبرنا عن تفاصيل مشروعك ورؤيتك..."
              disabled={isDisabled}
              className="bg-black/30 border-zeriv-border hover:border-white/20 focus:border-zeriv-red min-h-[120px] text-right"
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-[10px] text-zeriv-red font-mono">{errors.message}</p>
            )}
          </div>

          {status === "success" && (
            <div className="flex items-center gap-3 rounded-xl border border-zeriv-green/30 bg-zeriv-green/5 p-4 text-xs text-zeriv-green-light">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>تم إرسال رسالتك بنجاح! تم استلام دفق البيانات وسنتواصل معك قريباً.</span>
            </div>
          )}

          {status === "error" && errorMessage && (
            <div className="flex items-center gap-3 rounded-xl border border-zeriv-red/30 bg-zeriv-red/5 p-4 text-xs text-zeriv-red">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <Button type="submit" size="lg" disabled={isDisabled} className="w-full sm:w-auto cursor-pointer">
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري إرسال البيانات...
              </>
            ) : (
              "إرسال كود الطلب"
            )}
          </Button>
        </form>
      </div>

      {/* Left Column (displayed second in RTL): System Console Terminal */}
      <div className="rounded-xl border border-zeriv-border bg-black/90 p-5 flex flex-col justify-between overflow-hidden relative min-h-[300px] lg:min-h-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 flex-row-reverse">
          <div className="flex items-center gap-2 flex-row-reverse">
            <Terminal className="h-4 w-4 text-zeriv-red" />
            <span className="text-xs font-mono text-zeriv-offwhite/90">SYSTEM_CONSOLE // LOGS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zeriv-red animate-pulse" />
            <span className="text-[9px] font-mono text-zeriv-red uppercase">ACTIVE_LISTEN</span>
          </div>
        </div>

        {/* Console logs terminal area */}
        <div className="flex-1 font-mono text-[10px] text-zeriv-green-light space-y-2 overflow-y-auto max-h-[380px] text-left select-text scrollbar-thin" dir="ltr">
          {logs.map((log, idx) => (
            <div key={idx} className="leading-relaxed hover:bg-white/[0.02] py-0.5 px-1 rounded transition-colors break-all">
              {log}
            </div>
          ))}
          <div ref={consoleEndRef} />
        </div>

        {/* Footer info inside terminal */}
        <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-[8px] font-mono text-zeriv-muted flex-row-reverse">
          <span>PORT: 443 // SECURE</span>
          <span>ZERIV_CORE v1.0.0</span>
        </div>
      </div>

    </div>
  );
}
