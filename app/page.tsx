"use client"

import {useMemo, useState} from "react"
import {Hero} from "@/components/hero"
import {Header} from "@/components/header"
import {CategoryFilters} from "@/components/category-filters"
import {ContinentFilters} from "@/components/continent-filters"
import {CityGrid} from "@/components/city-grid"
import {Footer} from "@/components/footer"
import {cities, filterByCategory, filterByContinent} from "@/lib/data"
import type {City, Continent, FilterCategory} from "@/lib/types"

export default function HomePage() {
    const [activeFilters, setActiveFilters] = useState<FilterCategory[]>([])
    const [activeContinent, setActiveContinent] = useState<Continent>("All")

    const filteredCities = useMemo(() => {
        let result = cities

        // Apply continent filter
        result = filterByContinent(result, activeContinent)

        // Apply category filters
        if (activeFilters.length > 0) {
            result = activeFilters.reduce((acc, filter) => {
                return filterByCategory(acc, filter)
            }, result)
        }

        return result
    }, [activeFilters, activeContinent])

    const handleFilterToggle = (filter: FilterCategory) => {
        setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
    }

    const handleContinentChange = (continent: Continent) => {
        setActiveContinent(continent)
    }

    const handleCityClick = (city: City) => {
        // TODO: Implement city detail modal or page
        console.log("City clicked:", city)
    }

    return (
        <div className="min-h-screen bg-background">
            <Header/>
            <Hero/>
            <CategoryFilters activeFilters={activeFilters} onFilterToggle={handleFilterToggle}/>
            <ContinentFilters activeContinent={activeContinent} onContinentChange={handleContinentChange}/>

            {/* Cities Section */}
            <section className="py-16 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                            {filteredCities.length}개의 도시를 찾았습니다
                        </h2>
                        <p className="text-lg text-muted-foreground text-pretty">
                            {activeContinent !== "All" && `${activeContinent} 지역의 `}
                            {activeFilters.length > 0 && `${activeFilters.length}개 조건에 맞는 `}
                            도시들을 확인해보세요
                        </p>
                    </div>

                    <CityGrid cities={filteredCities} onCityClick={handleCityClick}/>

                    {/* Statistics */}
                    {filteredCities.length > 0 && (
                        <div className="mt-16 text-center">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                                <div className="space-y-2">
                                    <div className="text-2xl font-bold text-primary">
                                        $
                                        {Math.round(
                                            filteredCities.reduce((acc, city) => acc + city.cost, 0) / filteredCities.length,
                                        ).toLocaleString()}
                                    </div>
                                    <div className="text-sm text-muted-foreground">평균 생활비</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-2xl font-bold text-primary">
                                        {Math.round(
                                            filteredCities.reduce((acc, city) => acc + city.internetSpeed, 0) / filteredCities.length,
                                        )}{" "}
                                        Mbps
                                    </div>
                                    <div className="text-sm text-muted-foreground">평균 인터넷 속도</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-2xl font-bold text-primary">
                                        {Math.round(
                                            filteredCities.reduce((acc, city) => acc + city.temperature, 0) / filteredCities.length,
                                        )}
                                        °C
                                    </div>
                                    <div className="text-sm text-muted-foreground">평균 기온</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer/>
        </div>
    )
}
