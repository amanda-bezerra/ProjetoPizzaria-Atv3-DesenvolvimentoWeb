"use client"

import { useState, useEffect } from "react"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerNotes, setCustomerNotes] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  // Format price to Brazilian currency
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  // Check form validity whenever form fields change
  useEffect(() => {
    setIsFormValid(customerName.trim() !== "" && customerPhone.trim() !== "" && customerAddress.trim() !== "")
  }, [customerName, customerPhone, customerAddress])

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  // Create WhatsApp message and send order
  const handleSendToWhatsApp = () => {
    // Validate form before proceeding
    if (!isFormValid) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    // Format the order message
    let message = `*Novo Pedido - Projeto Pizzaria*\n\n`
    message += `*Cliente:* ${customerName}\n`
    message += `*Telefone:* ${customerPhone}\n`
    message += `*Endereço:* ${customerAddress}\n\n`
    message += `*Itens do Pedido:*\n`

    items.forEach((item) => {
      message += `- ${item.quantity}x ${item.name}`

      // Add selected options if available
      if (item.selectedOptions) {
        if (item.selectedOptions.size) {
          message += ` (${item.selectedOptions.size.name})`
        }

        // Add selected extras
        if (item.selectedOptions.extras) {
          const extras = Object.entries(item.selectedOptions.extras)
            .map(([category, option]) => `${option}`)
            .join(", ")

          if (extras) {
            message += ` [${extras}]`
          }
        }
      }

      message += ` - ${formatPrice(item.price * item.quantity)}\n`
    })

    message += `\n*Total:* ${formatPrice(getTotalPrice())}\n\n`

    if (customerNotes) {
      message += `*Observações:* ${customerNotes}\n`
    }

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)

    // Replace with the restaurant's WhatsApp number
    const whatsappNumber = "5565999242422"

    // Create the WhatsApp URL - dynamic link for sending orders
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")

    // Close the checkout dialog and cart
    setIsCheckoutOpen(false)
    onClose()
    clearCart()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay background */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* Cart sidebar - full width on mobile, fixed width on larger screens */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl overflow-y-auto">
        <div className="p-4 flex flex-col h-full">
          {/* Cart header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <ShoppingBag className="mr-2" /> Seu Carrinho
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {/* Empty cart state */}
          {items.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag size={64} className="mb-4 opacity-20" />
              <p className="text-center">Seu carrinho está vazio</p>
              <p className="text-center text-sm mt-2">Adicione itens para continuar</p>
              <Button className="mt-4 bg-rose-600 hover:bg-rose-700" onClick={onClose}>
                Ver Cardápio
              </Button>
            </div>
          ) : (
            <>
              {/* Cart items list */}
              <div className="flex-grow overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex border-b py-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-rose-600">
                          <X size={16} />
                        </button>
                      </div>

                      {/* Show selected options if available */}
                      {item.selectedOptions && (
                        <div className="text-xs text-gray-500 mt-1">
                          {item.selectedOptions.size && (
                            <p>
                              {item.selectedOptions.size.name}{" "}
                              {item.selectedOptions.size.description && `(${item.selectedOptions.size.description})`}
                            </p>
                          )}

                          {item.selectedOptions.extras && Object.entries(item.selectedOptions.extras).length > 0 && (
                            <p>
                              {Object.entries(item.selectedOptions.extras)
                                .map(([category, option]) => `${option}`)
                                .join(", ")}
                            </p>
                          )}
                        </div>
                      )}

                      <p className="text-gray-500 text-sm">{formatPrice(item.price)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                        <span className="ml-auto font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart summary and checkout button */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Taxa de entrega</span>
                  <span>Grátis</span>
                </div>
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total</span>
                  <span className="text-rose-600">{formatPrice(getTotalPrice())}</span>
                </div>
                <Button className="w-full bg-rose-600 hover:bg-rose-700 py-6" onClick={handleCheckout}>
                  Finalizar Pedido
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout dialog with form validation */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Finalizar Pedido</DialogTitle>
          </DialogHeader>
          {/* Checkout form with HTML5 validation */}
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome <span className="text-rose-600">*</span>
              </label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Telefone <span className="text-rose-600">*</span>
              </label>
              <Input
                id="phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="address" className="text-sm font-medium">
                Endereço de Entrega <span className="text-rose-600">*</span>
              </label>
              <Input
                id="address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Rua, número, bairro, complemento"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Observações (opcional)
              </label>
              <Textarea
                id="notes"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Ex: sem cebola, ponto da carne, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
              Cancelar
            </Button>
            {/* Button is disabled until form is valid */}
            <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleSendToWhatsApp} disabled={!isFormValid}>
              Enviar para WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
