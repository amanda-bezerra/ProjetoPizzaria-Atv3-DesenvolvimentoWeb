"use client"

import { ArrowRight } from "lucide-react"

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop')",
            filter: "brightness(0.4)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 to-rose-800/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          {/* Coupon text */}
          <p className="text-white font-bold text-lg md:text-xl mb-3">UTILIZE O CUPOM</p>

          {/* Coupon code */}
          <div className="inline-block mb-4">
            <div className="bg-rose-700 border-2 border-yellow-400 px-4 py-2 rounded-md">
              <span className="text-yellow-400 font-bold text-xl md:text-2xl tracking-wider">sejaprime</span>
            </div>
          </div>

          {/* Main offer */}
          <h1 className="text-white text-2xl md:text-4xl font-extrabold mb-4 leading-tight">
            GANHE <span className="text-yellow-400">R$20,00</span> NO SEU PRIMEIRO PEDIDO
          </h1>

          {/* Promotion rules */}
          <p className="text-white/80 text-sm md:text-base mb-6 max-w-2xl">
            *Válido apenas para novos clientes. Pedido mínimo de R$50,00. Cupom válido por 7 dias após o cadastro. Não
            cumulativo com outras promoções.
          </p>

          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 hidden lg:block">
            <div
              className="w-24 h-24 rounded-full border-4 border-yellow-400/30 border-dashed animate-spin-slow"
              style={{ animationDuration: "15s" }}
            />
          </div>
          <div className="absolute bottom-10 right-20 hidden lg:block">
            <div className="w-16 h-16 rounded-full bg-yellow-400/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
