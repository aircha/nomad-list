"use client"

import {Button} from "@/components/ui/button"
import type {Continent} from "@/lib/types"
import {getContinentCounts} from "@/lib/data"

interface ContinentFiltersProps {
    activeContinent: Continent
    onContinentChange: (continent: Continent) => void
}

const continentOptions: { id: Continent; label: string; emoji: string }[] = [
    {id: "All", label: "전체", emoji: "🌍"},
    {id: "Asia", label: "아시아", emoji: "🏯"},
    {id: "Europe", label: "유럽", emoji: "🏰"},
    {id: "North America", label: "북미", emoji: "🗽"},
    {id: "South America", label: "남미", emoji: "🏔️"},
    {id: "Africa", label: "아프리카", emoji: "🦁"},
    {id: "Oceania", label: "오세아니아", emoji: "🏄"},
    {id: "Middle East", label: "중동", emoji: "🕌"},
]

export function ContinentFilters({activeContinent, onContinentChange}: ContinentFiltersProps) {
    const continentCounts = getContinentCounts()

    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">대륙별로 찾아보기</h2>
                    <p className="text-muted-foreground">관심있는 지역의 도시들을 확인해보세요</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    {continentOptions.map((option) => {
                        const isActive = activeContinent === option.id
                        const count = continentCounts[option.id] || 0

                        return (
                            <Button
                                key={option.id}
                                variant={isActive ? "default" : "outline"}
                                className={`h-auto px-4 py-3 flex items-center space-x-2 transition-all duration-300 ${
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "bg-card hover:bg-card/80 border-border hover:border-primary/50"
                                }`}
                                onClick={() => onContinentChange(option.id)}
                            >
                                <span className="text-lg">{option.emoji}</span>
                                <div className="flex flex-col items-start">
                  <span className={`font-medium ${isActive ? "text-primary-foreground" : "text-card-foreground"}`}>
                    {option.label}
                  </span>
                                    <span
                                        className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {count}개 도시
                  </span>
                                </div>
                            </Button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
