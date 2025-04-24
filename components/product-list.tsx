"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  ingredients?: string[]
  sizes?: {
    name: string
    description: string
    price: number
  }[]
  extras?: {
    category: string
    options: {
      name: string
      price: number
    }[]
  }[]
}

interface ProductListProps {
  category: string | null
  searchQuery: string
}

export function ProductList({ category, searchQuery }: ProductListProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Sample product data - in a real app, this would come from an API
  const [products, setProducts] = useState<Product[]>([
    // Pizzas
    {
      id: "1",
      name: "Pizza Margherita",
      description: "Molho de tomate, mussarela, manjericão fresco",
      price: 39.9,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop",
      category: "pizzas",
      ingredients: ["Molho de tomate", "Mussarela", "Manjericão fresco", "Azeite de oliva", "Orégano"],
      sizes: [
        { name: "Grande", description: "8 fatias", price: 39.9 },
        { name: "Média", description: "6 fatias", price: 34.9 },
        { name: "Broto", description: "4 fatias", price: 29.9 },
      ],
      extras: [
        {
          category: "Borda",
          options: [
            { name: "Sem borda recheada", price: 0 },
            { name: "Catupiry", price: 5 },
            { name: "Cheddar", price: 5 },
            { name: "Cream cheese", price: 6 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Coca-Cola 2L", price: 12 },
            { name: "Guaraná 2L", price: 10 },
            { name: "Suco de laranja 500ml", price: 8 },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Pizza Pepperoni",
      description: "Molho de tomate, mussarela, pepperoni",
      price: 45.9,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop",
      category: "pizzas",
      ingredients: ["Molho de tomate", "Mussarela", "Pepperoni", "Orégano"],
      sizes: [
        { name: "Grande", description: "8 fatias", price: 45.9 },
        { name: "Média", description: "6 fatias", price: 39.9 },
        { name: "Broto", description: "4 fatias", price: 32.9 },
      ],
      extras: [
        {
          category: "Borda",
          options: [
            { name: "Sem borda recheada", price: 0 },
            { name: "Catupiry", price: 5 },
            { name: "Cheddar", price: 5 },
            { name: "Cream cheese", price: 6 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Coca-Cola 2L", price: 12 },
            { name: "Guaraná 2L", price: 10 },
            { name: "Suco de laranja 500ml", price: 8 },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Pizza Quatro Queijos",
      description: "Molho de tomate, mussarela, provolone, gorgonzola e parmesão",
      price: 49.9,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
      category: "pizzas",
      ingredients: ["Molho de tomate", "Mussarela", "Provolone", "Gorgonzola", "Parmesão", "Orégano", "Azeitonas"],
      sizes: [
        { name: "Grande", description: "8 fatias", price: 49.9 },
        { name: "Média", description: "6 fatias", price: 44.9 },
        { name: "Broto", description: "4 fatias", price: 36.9 },
      ],
      extras: [
        {
          category: "Borda",
          options: [
            { name: "Sem borda recheada", price: 0 },
            { name: "Catupiry", price: 5 },
            { name: "Cheddar", price: 5 },
            { name: "Cream cheese", price: 6 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Coca-Cola 2L", price: 12 },
            { name: "Guaraná 2L", price: 10 },
            { name: "Suco de laranja 500ml", price: 8 },
          ],
        },
      ],
    },

    // Hamburgers
    {
      id: "4",
      name: "Hambúrguer Clássico",
      description: "Pão, hambúrguer 180g, queijo, alface, tomate, cebola",
      price: 29.9,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
      category: "burgers",
      ingredients: ["Pão brioche", "Hambúrguer 180g", "Queijo cheddar", "Alface", "Tomate", "Cebola", "Molho especial"],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Batata frita pequena", price: 8 },
            { name: "Batata frita média", price: 10 },
            { name: "Batata frita grande", price: 12 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Refrigerante lata", price: 6 },
            { name: "Suco natural 300ml", price: 8 },
          ],
        },
      ],
    },
    {
      id: "5",
      name: "Hambúrguer Bacon",
      description: "Pão, hambúrguer 180g, queijo cheddar, bacon crocante, cebola caramelizada",
      price: 34.9,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=600&auto=format&fit=crop",
      category: "burgers",
      ingredients: [
        "Pão brioche",
        "Hambúrguer 180g",
        "Queijo cheddar",
        "Bacon crocante",
        "Cebola caramelizada",
        "Molho barbecue",
      ],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Batata frita pequena", price: 8 },
            { name: "Batata frita média", price: 10 },
            { name: "Batata frita grande", price: 12 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Refrigerante lata", price: 6 },
            { name: "Suco natural 300ml", price: 8 },
          ],
        },
      ],
    },
    {
      id: "6",
      name: "Hambúrguer Vegetariano",
      description: "Pão integral, hambúrguer de grão de bico, queijo, alface, tomate, cebola roxa",
      price: 27.9,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop",
      category: "burgers",
      ingredients: [
        "Pão integral",
        "Hambúrguer de grão de bico",
        "Queijo",
        "Alface",
        "Tomate",
        "Cebola roxa",
        "Molho de iogurte",
      ],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Batata frita pequena", price: 8 },
            { name: "Batata frita média", price: 10 },
            { name: "Batata frita grande", price: 12 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Refrigerante lata", price: 6 },
            { name: "Suco natural 300ml", price: 8 },
          ],
        },
      ],
    },

    // Pastas
    {
      id: "7",
      name: "Espaguete à Bolonhesa",
      description: "Espaguete, molho de tomate, carne moída",
      price: 32.9,
      image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=600&auto=format&fit=crop",
      category: "pastas",
      ingredients: [
        "Espaguete",
        "Molho de tomate",
        "Carne moída",
        "Cebola",
        "Alho",
        "Manjericão",
        "Queijo parmesão ralado",
      ],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Pão de alho", price: 6 },
            { name: "Salada verde", price: 8 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Refrigerante lata", price: 6 },
            { name: "Suco natural 300ml", price: 8 },
            { name: "Vinho tinto taça", price: 15 },
          ],
        },
      ],
    },
    {
      id: "8",
      name: "Fettuccine Alfredo",
      description: "Fettuccine, molho branco, frango desfiado, champignon",
      price: 36.9,
      image:
        "https://www.southernliving.com/thmb/rh5eWwbkBgA7gXo54f9OnwJka48=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Fettuccine_Alfredo_006-aa0899e03f394690885e85a3ec4ea3d0.jpg",
      category: "pastas",
      ingredients: [
        "Fettuccine",
        "Molho branco",
        "Frango desfiado",
        "Champignon",
        "Creme de leite",
        "Manteiga",
        "Queijo parmesão",
      ],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Pão de alho", price: 6 },
            { name: "Salada verde", price: 8 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Refrigerante lata", price: 6 },
            { name: "Suco natural 300ml", price: 8 },
            { name: "Vinho branco taça", price: 15 },
          ],
        },
      ],
    },
    {
      id: "9",
      name: "Lasanha à Bolonhesa",
      description: "Massa de lasanha, molho de tomate, carne moída, molho branco, queijo",
      price: 38.9,
      image: "https://images.unsplash.com/photo-1619895092538-128341789043?q=80&w=600&auto=format&fit=crop",
      category: "pastas",
      ingredients: [
        "Massa de lasanha",
        "Molho de tomate",
        "Carne moída",
        "Molho branco",
        "Queijo mussarela",
        "Queijo parmesão",
      ],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Pão de alho", price: 6 },
            { name: "Salada verde", price: 8 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Refrigerante lata", price: 6 },
            { name: "Suco natural 300ml", price: 8 },
            { name: "Vinho tinto taça", price: 15 },
          ],
        },
      ],
    },

    // Salads
    {
      id: "10",
      name: "Salada Caesar",
      description: "Alface, croutons, parmesão, molho caesar",
      price: 25.9,
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop",
      category: "salads",
      ingredients: [
        "Alface americana",
        "Croutons",
        "Queijo parmesão",
        "Molho caesar",
        "Filé de frango grelhado",
        "Bacon crocante",
      ],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Pão italiano", price: 5 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Água mineral", price: 4 },
            { name: "Suco natural 300ml", price: 8 },
          ],
        },
      ],
    },
    {
      id: "11",
      name: "Salada Grega",
      description: "Alface, tomate, pepino, cebola roxa, azeitonas, queijo feta",
      price: 28.9,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop",
      category: "salads",
      ingredients: [
        "Alface",
        "Tomate",
        "Pepino",
        "Cebola roxa",
        "Azeitonas pretas",
        "Queijo feta",
        "Azeite de oliva",
        "Orégano",
      ],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Pão pita", price: 5 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Água mineral", price: 4 },
            { name: "Suco natural 300ml", price: 8 },
          ],
        },
      ],
    },
    {
      id: "12",
      name: "Salada Caprese",
      description: "Tomate, mussarela de búfala, manjericão, azeite, vinagre balsâmico",
      price: 26.9,
      image: "https://images.unsplash.com/photo-1608032077018-c9aad9565d29?q=80&w=600&auto=format&fit=crop",
      category: "salads",
      ingredients: [
        "Tomate",
        "Mussarela de búfala",
        "Manjericão fresco",
        "Azeite de oliva extra virgem",
        "Vinagre balsâmico",
        "Sal",
        "Pimenta do reino",
      ],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Pão italiano", price: 5 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Água mineral", price: 4 },
            { name: "Suco natural 300ml", price: 8 },
          ],
        },
      ],
    },

    // Desserts
    {
      id: "13",
      name: "Pudim de Leite",
      description: "Pudim de leite condensado com calda de caramelo",
      price: 15.9,
      image:
        "https://static.itdg.com.br/images/640-440/d1307a2e17cda187df76b78cfd3ac464/shutterstock-2322251819-1-.jpg",
      category: "desserts",
      ingredients: ["Leite condensado", "Leite", "Ovos", "Açúcar caramelizado"],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Calda extra", price: 2 },
            { name: "Chantilly", price: 3 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Café expresso", price: 5 },
            { name: "Cappuccino", price: 8 },
          ],
        },
      ],
    },
    {
      id: "14",
      name: "Cheesecake",
      description: "Cheesecake com calda de frutas vermelhas",
      price: 18.9,
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop",
      category: "desserts",
      ingredients: ["Cream cheese", "Biscoito", "Manteiga", "Açúcar", "Frutas vermelhas", "Gelatina"],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Calda extra", price: 3 },
            { name: "Sorvete de creme", price: 5 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Café expresso", price: 5 },
            { name: "Cappuccino", price: 8 },
          ],
        },
      ],
    },
    {
      id: "15",
      name: "Brownie com Sorvete",
      description: "Brownie de chocolate quente com sorvete de baunilha",
      price: 19.9,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop",
      category: "desserts",
      ingredients: ["Brownie de chocolate", "Sorvete de baunilha", "Calda de chocolate", "Chantilly", "Cereja"],
      extras: [
        {
          category: "Acompanhamento",
          options: [
            { name: "Sem acompanhamento", price: 0 },
            { name: "Calda extra", price: 2 },
            { name: "Castanhas", price: 4 },
          ],
        },
        {
          category: "Bebida",
          options: [
            { name: "Sem bebida", price: 0 },
            { name: "Café expresso", price: 5 },
            { name: "Milkshake pequeno", price: 10 },
          ],
        },
      ],
    },

    // Drinks
    {
      id: "16",
      name: "Refrigerante",
      description: "Coca-Cola, Guaraná, Sprite, Fanta (lata 350ml)",
      price: 6.9,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop",
      category: "drinks",
      ingredients: ["Refrigerante em lata 350ml"],
      extras: [
        {
          category: "Opções",
          options: [
            { name: "Coca-Cola", price: 0 },
            { name: "Guaraná Antarctica", price: 0 },
            { name: "Sprite", price: 0 },
            { name: "Fanta Laranja", price: 0 },
            { name: "Fanta Uva", price: 0 },
          ],
        },
      ],
    },
    {
      id: "17",
      name: "Suco Natural",
      description: "Laranja, limão, abacaxi, maracujá (500ml)",
      price: 9.9,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=600&auto=format&fit=crop",
      category: "drinks",
      ingredients: ["Fruta fresca", "Água", "Açúcar (opcional)"],
      extras: [
        {
          category: "Sabor",
          options: [
            { name: "Laranja", price: 0 },
            { name: "Limão", price: 0 },
            { name: "Abacaxi", price: 0 },
            { name: "Maracujá", price: 0 },
            { name: "Morango", price: 2 },
          ],
        },
        {
          category: "Adicionais",
          options: [
            { name: "Sem adicionais", price: 0 },
            { name: "Gengibre", price: 1 },
            { name: "Hortelã", price: 1 },
            { name: "Leite condensado", price: 2 },
          ],
        },
      ],
    },
    {
      id: "18",
      name: "Cerveja",
      description: "Heineken, Stella Artois, Corona (long neck)",
      price: 12.9,
      image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=600&auto=format&fit=crop",
      category: "drinks",
      ingredients: ["Cerveja long neck 330ml"],
      extras: [
        {
          category: "Marca",
          options: [
            { name: "Heineken", price: 0 },
            { name: "Stella Artois", price: 0 },
            { name: "Corona", price: 1 },
            { name: "Budweiser", price: 0 },
            { name: "Brahma", price: -2 },
          ],
        },
      ],
    },

    // Combos
    {
      id: "19",
      name: "Combo Família",
      description: "Pizza grande, 4 refrigerantes e 1 sobremesa",
      price: 89.9,
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=600&auto=format&fit=crop",
      category: "combos",
      ingredients: ["1 Pizza grande (8 fatias)", "4 Refrigerantes em lata", "1 Sobremesa"],
      extras: [
        {
          category: "Sabor da Pizza",
          options: [
            { name: "Margherita", price: 0 },
            { name: "Pepperoni", price: 5 },
            { name: "Quatro Queijos", price: 8 },
            { name: "Calabresa", price: 0 },
            { name: "Frango com Catupiry", price: 3 },
          ],
        },
        {
          category: "Sobremesa",
          options: [
            { name: "Pudim de Leite", price: 0 },
            { name: "Cheesecake", price: 5 },
            { name: "Brownie com Sorvete", price: 8 },
          ],
        },
      ],
    },
    {
      id: "20",
      name: "Combo Casal",
      description: "2 hambúrgueres, 2 porções de batata frita, 2 refrigerantes",
      price: 69.9,
      image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?q=80&w=600&auto=format&fit=crop",
      category: "combos",
      ingredients: ["2 Hambúrgueres", "2 Porções de batata frita", "2 Refrigerantes em lata"],
      extras: [
        {
          category: "Hambúrgueres",
          options: [
            { name: "2 Clássicos", price: 0 },
            { name: "2 Bacon", price: 8 },
            { name: "1 Clássico e 1 Bacon", price: 4 },
            { name: "1 Clássico e 1 Vegetariano", price: 0 },
          ],
        },
        {
          category: "Batatas",
          options: [
            { name: "2 Médias", price: 0 },
            { name: "2 Grandes", price: 6 },
            { name: "1 Média e 1 Grande", price: 3 },
          ],
        },
      ],
    },
    {
      id: "21",
      name: "Combo Individual",
      description: "1 hambúrguer, 1 porção de batata frita, 1 refrigerante",
      price: 39.9,
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=600&auto=format&fit=crop",
      category: "combos",
      ingredients: ["1 Hambúrguer", "1 Porção de batata frita média", "1 Refrigerante em lata"],
      extras: [
        {
          category: "Hambúrguer",
          options: [
            { name: "Clássico", price: 0 },
            { name: "Bacon", price: 4 },
            { name: "Vegetariano", price: 0 },
          ],
        },
        {
          category: "Batata",
          options: [
            { name: "Média", price: 0 },
            { name: "Grande", price: 3 },
            { name: "Troca por onion rings", price: 5 },
          ],
        },
      ],
    },
  ])

  // Filter products based on selected category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === null || product.category === category
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Format price to Brazilian currency
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  // Handle opening the product detail modal
  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product)
  }

  // Handle closing the product detail modal
  const handleCloseProductDetail = () => {
    setSelectedProduct(null)
  }

  // Handle adding product to cart with toast notification
  const handleAddToCart = (product: Product) => {
    addToCart(product)

    // Show toast notification
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho`,
      variant: "success",
      duration: 3000,
    })
  }

  return (
    // Product listing section
    <section>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {category
          ? products
              .find((p) => p.category === category)
              ?.category.charAt(0)
              .toUpperCase() + products.find((p) => p.category === category)?.category.slice(1)
          : "Todos os Produtos"}
      </h2>

      {filteredProducts.length === 0 ? (
        // Empty state when no products match the filters
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum produto encontrado.</p>
        </div>
      ) : (
        // Responsive grid layout for products - mobile first with increasing columns on larger screens
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product image with better styling - clickable to show details */}
              <div
                className="relative h-48 bg-gray-100 overflow-hidden cursor-pointer"
                onClick={() => handleOpenProductDetail(product)}
              >
                <img
                  src={product.image || "/placeholder.svg?height=200&width=200"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Product details */}
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <p className="text-rose-600 font-bold text-lg">{formatPrice(product.price)}</p>
              </CardContent>

              {/* Add to cart button */}
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-rose-600 hover:bg-rose-700"
                  onClick={() => handleOpenProductDetail(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Product detail modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseProductDetail}
          formatPrice={formatPrice}
          addToCart={handleAddToCart}
        />
      )}
    </section>
  )
}
