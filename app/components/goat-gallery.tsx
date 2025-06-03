"use client"

import { useState, useEffect } from "react"
import GoatCard from "./goat-card"
import { goatsData } from "../data/goats"
import type { Goat } from "../types/goat"

export default function GoatGallery() {
  const [goats, setGoats] = useState<Goat[]>(goatsData)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("ab-livestock-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (goatId: string) => {
    const newFavorites = favorites.includes(goatId) ? favorites.filter((id) => id !== goatId) : [...favorites, goatId]

    setFavorites(newFavorites)
    localStorage.setItem("ab-livestock-favorites", JSON.stringify(newFavorites))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goats.map((goat) => (
        <GoatCard
          key={goat.id}
          goat={goat}
          isFavorite={favorites.includes(goat.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  )
}
