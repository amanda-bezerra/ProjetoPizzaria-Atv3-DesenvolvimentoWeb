"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  selectedOptions?: {
    size?: {
      name: string
      description: string
      price: number
    }
    extras?: Record<string, string>
  }
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

// Create context for cart functionality
const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  // State to store cart items
  const [items, setItems] = useState<CartItem[]>([])

  // Add a product to the cart
  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      // For products with customizations, we need to check if the exact same customization exists
      if (product.selectedOptions) {
        // Add as a new item since it has custom options
        return [...prevItems, { ...product, quantity: product.quantity || 1 }]
      } else {
        // For regular products without customizations
        const existingItem = prevItems.find((item) => item.id === product.id && !item.selectedOptions)

        if (existingItem) {
          // If item already exists, increment quantity
          return prevItems.map((item) =>
            item.id === product.id && !item.selectedOptions
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item,
          )
        } else {
          // If item doesn't exist, add it with quantity 1 or specified quantity
          return [...prevItems, { ...product, quantity: product.quantity || 1 }]
        }
      }
    })
  }

  // Remove a product from the cart
  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  // Update the quantity of a product in the cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  // Clear all items from the cart
  const clearCart = () => {
    setItems([])
  }

  // Get the total number of items in the cart
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  // Calculate the total price of all items in the cart
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
