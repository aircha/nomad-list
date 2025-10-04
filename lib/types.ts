export interface City {
    id: string
    name: string
    country: string
    continent: "Asia" | "Europe" | "North America" | "South America" | "Africa" | "Oceania" | "Middle East"
    cost: number // USD per month
    temperature: number // Celsius
    feelsLike?: number // Celsius
    internetSpeed: number // Mbps
    airQuality: number // AQI
    nomadScore: number // 1-5
    image: string // City image URL
    safety: "low" | "medium" | "high"
    weather: "cold" | "mild" | "warm" | "hot"
}

export type FilterCategory = "cheap" | "weather" | "internet" | "safety" | "air" | "warm"
export type Continent = City["continent"] | "All"
