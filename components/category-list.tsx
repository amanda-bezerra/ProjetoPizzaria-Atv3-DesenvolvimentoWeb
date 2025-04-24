"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Category {
  id: string
  name: string
  icon: string
}

interface CategoryListProps {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

export function CategoryList({ selectedCategory, setSelectedCategory }: CategoryListProps) {
  // Sample category data - in a real app, this would come from an API
  // Add category images to make them more visually appealing
  const [categories, setCategories] = useState<Category[]>([
    { id: "pizzas", name: "Pizzas", icon: "🍕" },
    { id: "burgers", name: "Hambúrgueres", icon: "🍔" },
    { id: "pastas", name: "Massas", icon: "🍝" },
    { id: "salads", name: "Saladas", icon: "🥗" },
    { id: "desserts", name: "Sobremesas", icon: "🍰" },
    { id: "drinks", name: "Bebidas", icon: "🥤" },
    { id: "combos", name: "Combos", icon: "🍱" },
  ])

  return (
    // Category section with horizontal scrolling for mobile
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-3 text-gray-800">Categorias</h2>
      {/* Horizontal scrollable area for categories - mobile friendly */}
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        {/* Update the category buttons to be more visually appealing */}
        <div className="flex space-x-2 pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className={`flex-shrink-0 ${selectedCategory === null ? "bg-rose-600 hover:bg-rose-700" : ""}`}
            onClick={() => setSelectedCategory(null)}
          >
            <span className="mr-2">🍽️</span>
            Todos
          </Button>

          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`flex-shrink-0 ${selectedCategory === category.id ? "bg-rose-600 hover:bg-rose-700" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2 text-lg">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}
