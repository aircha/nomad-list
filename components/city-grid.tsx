"use client"

import {CityCard} from "./city-card"
import type {City} from "@/lib/types"

interface CityGridProps {
    cities: City[]
    onCityClick?: (city: City) => void
}

export function CityGrid({cities, onCityClick}: CityGridProps) {
    if (cities.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl text-muted-foreground">🏙️</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">조건에 맞는 도시가 없습니다</h3>
                <p className="text-muted-foreground">다른 필터를 시도해보세요</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {cities.map((city) => (
                <CityCard key={city.id} city={city} onClick={() => onCityClick?.(city)}/>
            ))}
        </div>
    )
}
