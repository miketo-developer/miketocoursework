"use client";
import { useState, useEffect } from "react";

type FavId = string;

export function useFavorites() {
  // FIX HIDRATACIÓN: Inicializa vacío en server y cliente para que coincida
  const [favorites, setFavorites] = useState<FavId[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Lectura diferida para evitar cascading renders y hydration mismatch
    const t = setTimeout(() => {
      try {
        const stored = window.localStorage.getItem("miketo-favorites");
        if (stored) {
          setFavorites(JSON.parse(stored) as FavId[]);
        }
      } catch {}
      setMounted(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem("miketo-favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites, mounted]);

  const toggleFavorite = (id: FavId) => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]));
  };

  const isFavorite = (id: FavId) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite, mounted };
}