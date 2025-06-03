export interface Goat {
  id: string
  videoUrl: string
  thumbnail?: string
  status: "available" | "sold"
  description?: string
  price?: number
  dateListed?: string
  weight?: number
}
