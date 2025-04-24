// Utility functions for form validation

/**
 * Validates if all required fields in a form are filled
 * @param fields - Object containing form field values
 * @param requiredFields - Array of field names that are required
 * @returns boolean indicating if the form is valid
 */
export function validateRequiredFields(fields: Record<string, string>, requiredFields: string[]): boolean {
  return requiredFields.every((field) => fields[field] && fields[field].trim() !== "")
}

/**
 * Validates a Brazilian phone number format
 * @param phone - Phone number to validate
 * @returns boolean indicating if the phone number is valid
 */
export function validateBrazilianPhone(phone: string): boolean {
  // Basic validation for Brazilian phone numbers
  const phoneRegex = /^$$\d{2}$$ \d{4,5}-\d{4}$/
  return phoneRegex.test(phone) || /^\d{10,11}$/.test(phone.replace(/\D/g, ""))
}

/**
 * Formats a phone number to the Brazilian standard
 * @param phone - Phone number to format
 * @returns formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove non-numeric characters
  const numbers = phone.replace(/\D/g, "")

  // Format according to Brazilian standards
  if (numbers.length === 11) {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`
  } else if (numbers.length === 10) {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 6)}-${numbers.substring(6)}`
  }

  // Return original if not valid
  return phone
}
