import * as React from "react"

export type ToastProps = React.ComponentPropsWithoutRef<"div"> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "destructive";
}

export type ToastActionElement = React.ReactElement

const Toast = React.forwardRef<
  HTMLDivElement,
  ToastProps
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ${
        variant === "destructive" 
          ? "border-destructive bg-destructive text-destructive-foreground" 
          : "border bg-background text-foreground"
      } ${className || ""}`}
      {...props}
    />
  )
})
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm font-semibold ${className || ""}`}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm opacity-90 ${className || ""}`}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

export { Toast, ToastTitle, ToastDescription }