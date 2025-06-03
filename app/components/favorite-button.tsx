"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FavoriteButtonProps {
  goatId: string
}

export default function FavoriteButton({ goatId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const savedFavorites = localStorage.getItem("ab-livestock-favorites")
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites)
      setIsFavorite(favorites.includes(goatId))
    }
  }, [goatId])

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem("ab-livestock-favorites")
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : []

    const newFavorites = isFavorite ? favorites.filter((id: string) => id !== goatId) : [...favorites, goatId]

    localStorage.setItem("ab-livestock-favorites", JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleFavorite}
      className={isFavorite ? "text-red-600 border-red-300" : ""}
    >
      <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
    </Button>
  )
}
