"use client"

import { useState, useEffect } from "react"
import { Pizza, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section with background image */}
      <div className="relative flex-grow flex flex-col items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop')",
              filter: "brightness(0.3)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-rose-900/50 to-black/70" />
        </div>

        {/* Content container */}
        <div
          className={`relative z-10 max-w-4xl mx-auto px-4 py-16 text-center transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-5 shadow-lg">
              <Pizza className="h-20 w-20 text-rose-600" />
            </div>
          </div>

          {/* Welcome text */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Bem-vindo ao <span className="text-rose-400">Projeto Pizzaria</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/90 mb-6">Sabor e qualidade em cada pedaço</p>

          {/* Description */}
          <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
            Nossas pizzas são preparadas com ingredientes frescos e de alta qualidade. Combinamos tradição italiana com
            um toque brasileiro para criar sabores únicos que vão encantar seu paladar.
          </p>

          {/* CTA Button */}
          <Link href="/cardapio">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-6 rounded-full text-lg font-bold transition-transform hover:scale-105 shadow-lg group">
              Ver Cardápio
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">Entrega Rápida</h3>
              <p className="text-white/80">Receba seu pedido em até 40 minutos ou a entrega é grátis</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">Ingredientes Frescos</h3>
              <p className="text-white/80">Selecionamos apenas os melhores ingredientes para nossas receitas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">Promoções Exclusivas</h3>
              <p className="text-white/80">Ofertas especiais para clientes cadastrados em nosso app</p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 hidden lg:block">
          <div
            className="w-32 h-32 rounded-full border-4 border-rose-400/30 border-dashed animate-spin-slow"
            style={{ animationDuration: "20s" }}
          />
        </div>
        <div className="absolute bottom-20 left-20 hidden lg:block">
          <div className="w-24 h-24 rounded-full bg-rose-400/10" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
