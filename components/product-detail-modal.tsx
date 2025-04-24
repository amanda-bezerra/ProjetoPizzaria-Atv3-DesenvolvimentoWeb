"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus, ShoppingCart, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProductSize {
  name: string
  description: string
  price: number
}

interface ProductExtra {
  category: string
  options: {
    name: string
    price: number
  }[]
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  ingredients?: string[]
  sizes?: ProductSize[]
  extras?: ProductExtra[]
}

interface ProductDetailModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  formatPrice: (price: number) => string
  addToCart: (product: any) => void
}

export function ProductDetailModal({ product, isOpen, onClose, formatPrice, addToCart }: ProductDetailModalProps) {
  const { toast } = useToast()

  // State for selected options
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null,
  )

  const [selectedExtras, setSelectedExtras] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)

  // Calculate total price based on selections
  const calculateTotalPrice = () => {
    let total = selectedSize ? selectedSize.price : product.price

    // Add extras prices
    if (product.extras) {
      product.extras.forEach((extraCategory) => {
        const selectedOption = selectedExtras[extraCategory.category]
        if (selectedOption) {
          const option = extraCategory.options.find((opt) => opt.name === selectedOption)
          if (option) {
            total += option.price
          }
        }
      })
    }

    // Multiply by quantity
    return total * quantity
  }

  // Validate if all required options are selected
  const validateSelections = () => {
    const missingSelections: string[] = []

    // Check if product has extras and if all categories have a selection
    if (product.extras) {
      product.extras.forEach((extraCategory) => {
        if (!selectedExtras[extraCategory.category]) {
          missingSelections.push(extraCategory.category)
        }
      })
    }

    // Check if product has sizes and if a size is selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      missingSelections.push("Tamanho")
    }

    return {
      isValid: missingSelections.length === 0,
      missingSelections,
    }
  }

  // Handle adding product to cart with all selected options
  const handleAddToCart = () => {
    const { isValid, missingSelections } = validateSelections()

    if (!isValid) {
      // Show error toast with missing selections
      toast({
        title: "Seleção incompleta",
        description: `Por favor, selecione: ${missingSelections.join(", ")}`,
        variant: "destructive",
        duration: 5000,
      })
      return
    }

    const customizedProduct = {
      ...product,
      price: calculateTotalPrice() / quantity, // Store the unit price with customizations
      selectedOptions: {
        size: selectedSize,
        extras: selectedExtras,
      },
      quantity: quantity,
    }

    addToCart(customizedProduct)
    onClose()
  }

  // Handle selecting an extra option
  const handleSelectExtra = (category: string, optionName: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [category]: optionName,
    }))
  }

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-rose-600">{product.name}</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </button>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Product image */}
          <div className="relative h-64 overflow-hidden rounded-md">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product description */}
          <div>
            <h3 className="font-medium text-lg mb-2">Descrição</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">Ingredientes</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Size options */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">
                Qual tamanho? <span className="text-rose-600">*</span>
              </h3>
              <RadioGroup
                value={selectedSize?.name}
                onValueChange={(value) => {
                  const size = product.sizes?.find((s) => s.name === value)
                  if (size) setSelectedSize(size)
                }}
              >
                <div className="grid gap-2">
                  {product.sizes.map((size) => (
                    <div key={size.name} className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={size.name} id={`size-${size.name}`} />
                        <Label htmlFor={`size-${size.name}`} className="font-medium">
                          {size.name} {size.description && `(${size.description})`}
                        </Label>
                      </div>
                      <span className="text-rose-600 font-medium">{formatPrice(size.price)}</span>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Extra options */}
          {product.extras &&
            product.extras.map((extraCategory) => (
              <div key={extraCategory.category}>
                <h3 className="font-medium text-lg mb-2">
                  {extraCategory.category}: <span className="text-rose-600">*</span>
                </h3>
                <RadioGroup
                  value={selectedExtras[extraCategory.category] || ""}
                  onValueChange={(value) => handleSelectExtra(extraCategory.category, value)}
                >
                  <div className="grid gap-2">
                    {extraCategory.options.map((option) => (
                      <div key={option.name} className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={option.name} id={`${extraCategory.category}-${option.name}`} />
                          <Label htmlFor={`${extraCategory.category}-${option.name}`} className="font-medium">
                            {option.name}
                          </Label>
                        </div>
                        {option.price !== 0 && (
                          <span className={`font-medium ${option.price > 0 ? "text-rose-600" : "text-green-600"}`}>
                            {option.price > 0 ? `+${formatPrice(option.price)}` : formatPrice(option.price)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}

          {/* Required fields notice */}
          {(product.sizes?.length > 0 || product.extras?.length > 0) && (
            <div className="flex items-center text-sm text-gray-500">
              <AlertCircle className="h-4 w-4 mr-2 text-rose-600" />
              <span>
                Campos com <span className="text-rose-600">*</span> são obrigatórios
              </span>
            </div>
          )}

          {/* Quantity selector */}
          <div>
            <h3 className="font-medium text-lg mb-2">Quantidade</h3>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-medium w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Total price */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-xl font-bold text-rose-600">{formatPrice(calculateTotalPrice())}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar ao Carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
