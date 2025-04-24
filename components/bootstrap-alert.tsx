"use client"

// Example of a Bootstrap-inspired component
// This demonstrates the integration of Bootstrap styling concepts with Tailwind

import { AlertCircle, CheckCircle, Info, X } from "lucide-react"
import { useState } from "react"

type AlertVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info"

interface BootstrapAlertProps {
  variant: AlertVariant
  message: string
  dismissible?: boolean
}

export function BootstrapAlert({ variant, message, dismissible = false }: BootstrapAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  // Map Bootstrap variants to Tailwind classes
  const variantClasses = {
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-100 text-green-800 border-green-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-cyan-100 text-cyan-800 border-cyan-200",
  }

  // Map variants to icons
  const variantIcons = {
    primary: <Info className="h-5 w-5" />,
    secondary: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    danger: <AlertCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  }

  return (
    <div className={`flex items-center p-4 mb-4 rounded-lg border ${variantClasses[variant]}`} role="alert">
      <div className="mr-2">{variantIcons[variant]}</div>
      <div className="ml-3 text-sm font-medium flex-grow">{message}</div>
      {dismissible && (
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 ${variantClasses[variant]}`}
          onClick={() => setIsVisible(false)}
          aria-label="Close"
        >
          <span className="sr-only">Fechar</span>
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
