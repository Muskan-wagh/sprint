import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-xl bg-[#f3f4f6] px-5 py-4 text-base transition-all duration-300 placeholder:text-[#9ca3af] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#10b981]/40 border border-transparent focus:border-[#10b981]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }