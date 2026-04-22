import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl bg-[#f3f4f6] px-5 py-3 text-base transition-all duration-300 placeholder:text-[#9ca3af] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#10b981]/40 border border-transparent focus:border-[#10b981]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-12 w-full rounded-xl bg-[#f3f4f6] px-5 py-3 text-base transition-all duration-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#10b981]/40 border border-transparent focus:border-[#10b981]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Select.displayName = "Select"

export { Input, Select }