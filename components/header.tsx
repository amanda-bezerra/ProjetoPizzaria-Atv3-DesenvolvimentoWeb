"use client"

import { useState } from "react"
import { ShoppingCart, Search, Menu, X, Pizza } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"

interface HeaderProps {
  toggleCart: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function Header({ toggleCart, searchQuery, setSearchQuery }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems } = useCart()

  return (
    // Semantic header element with sticky positioning
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        {/* Responsive navbar using flexbox - mobile first approach */}
        <div className="flex items-center justify-between">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            {/* Mobile menu toggle - only visible on small screens */}
            <button className="md:hidden mr-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="flex items-center">
              <Pizza className="h-8 w-8 text-rose-600 mr-2" />
              {/* Responsive text - different on mobile vs desktop */}
              <h1 className="text-xl font-bold text-rose-600 hidden sm:block">Projeto Pizzaria</h1>
              <h1 className="text-xl font-bold text-rose-600 sm:hidden">Projeto</h1>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:flex w-1/3 mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Cart Button with item count indicator */}
          <Button onClick={toggleCart} variant="ghost" className="relative p-2">
            <ShoppingCart className="h-6 w-6 text-rose-600" />
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          </Button>
        </div>

        {/* Mobile Search - Only visible on mobile screens */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile Menu - Collapsible navigation for small screens */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 bg-white rounded-md shadow-lg p-4">
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="block px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-md">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/cardapio" className="block px-4 py-2 text-gray-700 hover:bg-rose-50 rounded-md">
                    Cardápio
                  </Link>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-rose-50 rounded-md">
                    Promoções
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-rose-50 rounded-md">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-rose-50 rounded-md">
                    Contato
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
