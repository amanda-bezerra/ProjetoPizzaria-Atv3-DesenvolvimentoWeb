// Add comments explaining the main structure
// This is the main page component that serves as the container for all other components
// It uses a mobile-first approach with responsive design

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CategoryList } from "@/components/category-list"
import { ProductList } from "@/components/product-list"
import { Cart } from "@/components/cart"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { HeroBanner } from "@/components/hero-banner"
import { RestaurantInfo } from "@/components/restaurant-info"

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <CartProvider>
      {/* Main container with mobile-first approach */}
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header with search and cart functionality */}
        <Header toggleCart={toggleCart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* New sections added above the category menu */}
        <HeroBanner />
        <RestaurantInfo />

        {/* Main content area - responsive with container class */}
        <main className="flex-grow container mx-auto px-4 py-6">
          {/* Category filtering section */}
          <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

          {/* Product listing section - responsive grid */}
          <ProductList category={selectedCategory} searchQuery={searchQuery} />
        </main>

        {/* Shopping cart sidebar */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Footer with contact information */}
        <Footer />
      </div>
    </CartProvider>
  )
}
