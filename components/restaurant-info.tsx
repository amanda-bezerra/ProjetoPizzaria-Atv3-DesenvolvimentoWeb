"use client"

import { Clock, DollarSign, Pizza, Truck } from "lucide-react"

export function RestaurantInfo() {
  return (
    <div className="bg-white shadow-md rounded-lg mx-4 -mt-6 relative z-20 mb-6">
      <div className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Logo and name */}
        <div className="flex items-center">
          <div className="bg-rose-600 rounded-full p-3 mr-3">
            <Pizza className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Projeto Pizza</h2>
            <div className="inline-block bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs font-bold">ABERTO</div>

          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-12 w-px bg-gray-200 mx-2"></div>

        {/* Restaurant info */}
        <div className="flex flex-wrap gap-4 md:gap-6">
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Taxa de entrega</p>
              <p className="text-sm font-medium text-green-600">GRÁTIS</p>
            </div>
          </div>

          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Valor mínimo</p>
              <p className="text-sm font-medium">—</p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Tempo de preparo</p>
              <p className="text-sm font-medium">40 - 50 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
