"use client"

import {Button} from "@/components/ui/button"
import type {FilterCategory} from "@/lib/types"
import {DollarSign, Shield, Sun, Thermometer, Wifi, Wind} from "lucide-react"

interface CategoryFiltersProps {
    activeFilters: FilterCategory[]
    onFilterToggle: (filter: FilterCategory) => void
}

const filterOptions = [
    {
        id: "cheap" as FilterCategory,
        label: "저렴한 생활비",
        description: "$2,000/월 미만",
        icon: DollarSign,
        color: "text-emerald-600",
    },
    {
        id: "weather" as FilterCategory,
        label: "좋은 날씨",
        description: "20-28°C",
        icon: Sun,
        color: "text-amber-600",
    },
    {
        id: "internet" as FilterCategory,
        label: "빠른 인터넷",
        description: "20+ Mbps",
        icon: Wifi,
        color: "text-blue-600",
    },
    {
        id: "safety" as FilterCategory,
        label: "높은 안전도",
        description: "안전한 지역",
        icon: Shield,
        color: "text-green-600",
    },
    {
        id: "air" as FilterCategory,
        label: "깨끗한 공기",
        description: "AQI 50 미만",
        icon: Wind,
        color: "text-cyan-600",
    },
    {
        id: "warm" as FilterCategory,
        label: "따뜻한 기후",
        description: "25°C 이상",
        icon: Thermometer,
        color: "text-orange-600",
    },
]

export function CategoryFilters({activeFilters, onFilterToggle}: CategoryFiltersProps) {
    return (
        <section id="filters" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">원하는 조건으로 찾아보세요</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        여러 조건을 선택하여 완벽한 디지털 노마드 도시를 찾아보세요
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {filterOptions.map((option) => {
                        const Icon = option.icon
                        const isActive = activeFilters.includes(option.id)

                        return (
                            <Button
                                key={option.id}
                                variant={isActive ? "default" : "outline"}
                                className={`h-auto p-6 flex flex-col items-center space-y-3 transition-all duration-300 hover:scale-105 ${
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "bg-card hover:bg-card/80 border-border hover:border-primary/50"
                                }`}
                                onClick={() => onFilterToggle(option.id)}
                            >
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                        isActive ? "bg-primary-foreground/20" : "bg-muted"
                                    }`}
                                >
                                    <Icon className={`w-6 h-6 ${isActive ? "text-primary-foreground" : option.color}`}/>
                                </div>
                                <div className="text-center">
                                    <div
                                        className={`font-semibold ${isActive ? "text-primary-foreground" : "text-card-foreground"}`}>
                                        {option.label}
                                    </div>
                                    <div
                                        className={`text-sm ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                        {option.description}
                                    </div>
                                </div>
                            </Button>
                        )
                    })}
                </div>

                {/* Active Filters Summary */}
                {activeFilters.length > 0 && (
                    <div className="mt-8 text-center">
                        <div
                            className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2">
                            <span className="text-sm text-muted-foreground">활성 필터:</span>
                            <span className="text-sm font-medium text-card-foreground">{activeFilters.length}개</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={() => activeFilters.forEach((filter) => onFilterToggle(filter))}
                            >
                                모두 해제
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
