import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-zeriv-border bg-zeriv-surface px-4 py-3 text-sm text-zeriv-fg placeholder:text-zeriv-fg-soft/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ce1126]/30 focus-visible:border-[#ce1126] disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
