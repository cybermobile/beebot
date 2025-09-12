import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-bytebot-bronze-light-11 selection:bg-bytebot-bronze-dark-7 selection:text-white border-bytebot-bronze-light-6 flex h-10 w-full min-w-0 rounded-md border bg-white px-3 py-2 text-sm shadow-sm transition-colors outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-bytebot-bronze-dark-7 focus-visible:ring-bytebot-bronze-dark-7/20 focus-visible:ring-2",
        className
      )}
      {...props}
    />
  )
}

export { Input }