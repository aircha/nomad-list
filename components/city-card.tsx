"use client"

import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import type {City} from "@/lib/types"
import {Shield, Star, Thermometer, Wifi, Wind} from "lucide-react"

interface CityCardProps {
    city: City
    onClick?: () => void
}

export function CityCard({city, onClick}: CityCardProps) {
    const renderStars = (score: number) => {
        const fullStars = Math.floor(score)
        const hasHalfStar = score % 1 >= 0.5
        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400"/>)
        }

        if (hasHalfStar) {
            stars.push(<Star key="half" className="w-4 h-4 fill-amber-400/50 text-amber-400"/>)
        }

        const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/30"/>)
        }

        return stars
    }

    const getSafetyColor = (safety: City["safety"]) => {
        switch (safety) {
            case "high":
                return "bg-emerald-100 text-emerald-800 border-emerald-200"
            case "medium":
                return "bg-amber-100 text-amber-800 border-amber-200"
            case "low":
                return "bg-red-100 text-red-800 border-red-200"
        }
    }

    const getAirQualityColor = (aqi: number) => {
        if (aqi <= 50) return "text-emerald-600"
        if (aqi <= 100) return "text-amber-600"
        return "text-red-600"
    }

    const getTemperatureColor = (temp: number) => {
        if (temp <= 10) return "text-blue-600"
        if (temp <= 25) return "text-emerald-600"
        if (temp <= 30) return "text-amber-600"
        return "text-red-600"
    }

    return (
        <Card
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border bg-card"
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-t-lg">
                <img
                    src={city.image || "/placeholder.svg"}
                    alt={`${city.name}, ${city.country}`}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                    <Badge className={`${getSafetyColor(city.safety)} font-medium`}>
                        <Shield className="w-3 h-3 mr-1"/>
                        {city.safety === "high" ? "안전" : city.safety === "medium" ? "보통" : "주의"}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4 space-y-3">
                {/* City Name and Country */}
                <div className="space-y-1">
                    <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors">
                        {city.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{city.country}</p>
                </div>

                {/* Nomad Score */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">{renderStars(city.nomadScore)}</div>
                    <span className="text-sm font-medium text-card-foreground">{city.nomadScore.toFixed(1)}</span>
                </div>

                {/* Key Metrics */}
                <div className="space-y-2">
                    {/* Cost */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">월 생활비</span>
                        <span className="font-semibold text-card-foreground">${city.cost.toLocaleString()}</span>
                    </div>

                    {/* Temperature */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            <Thermometer className="w-4 h-4 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">현재 온도</span>
                        </div>
                        <span
                            className={`font-semibold ${getTemperatureColor(city.temperature)}`}>{city.temperature}°C</span>
                    </div>

                    {/* Internet Speed */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            <Wifi className="w-4 h-4 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">인터넷</span>
                        </div>
                        <span className="font-semibold text-card-foreground">{city.internetSpeed} Mbps</span>
                    </div>

                    {/* Air Quality */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            <Wind className="w-4 h-4 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">공기질</span>
                        </div>
                        <span
                            className={`font-semibold ${getAirQualityColor(city.airQuality)}`}>AQI {city.airQuality}</span>
                    </div>
                </div>

                {/* Continent Badge */}
                <div className="pt-2">
                    <Badge variant="secondary" className="text-xs">
                        {city.continent}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}
