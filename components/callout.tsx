import { cn } from "@/lib/utils"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const typeStyles: Record<
  NonNullable<CalloutProps["type"]>,
  string
> = {
  info: "border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 [&_code]:bg-blue-100 dark:[&_code]:bg-blue-900",
  warning: "border-yellow-600 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950 [&_code]:bg-yellow-100 dark:[&_code]:bg-yellow-900",
  success: "border-green-600 bg-green-50 dark:border-green-900 dark:bg-green-950 [&_code]:bg-green-100 dark:[&_code]:bg-green-900",
  danger: "border-red-600 bg-red-50 dark:border-red-900 dark:bg-red-950 [&_code]:bg-red-100 dark:[&_code]:bg-red-900",
}

type CalloutProps = React.ComponentProps<typeof Alert> & {
  icon?: React.ReactNode
  variant?: "default" | "info" | "warning"
  type?: "info" | "warning" | "success" | "danger"
}

export function Callout({
  title,
  children,
  icon,
  className,
  variant = "default",
  type,
  ...props
}: CalloutProps) {
  return (
    <Alert
      data-variant={variant}
      className={cn(
        "bg-background text-foreground mt-6 w-auto border md:-mx-1",
        type ? typeStyles[type] : undefined,
        className
      )}
      {...props}
    >
      {icon}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className="text-card-foreground/80">
        {children}
      </AlertDescription>
    </Alert>
  )
}
