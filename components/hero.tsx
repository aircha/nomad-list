"use client"

import {Button} from "@/components/ui/button"
import {ArrowDown, Globe, MapPin, Users} from "lucide-react"
import {AuroraBackground} from "@/components/ui/aurora-background"
import {motion} from "framer-motion"

export function Hero() {
    const scrollToFilters = () => {
        const filtersSection = document.getElementById("filters")
        if (filtersSection) {
            filtersSection.scrollIntoView({behavior: "smooth"})
        }
    }

    return (
        <AuroraBackground>
            <motion.div
                initial={{opacity: 0.0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div className="max-w-4xl mx-auto space-y-8 text-center">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4"/>
                        <span>전세계 디지털 노마드를 위한 플랫폼</span>
                    </div>

                    {/* Headlines */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold dark:text-white text-foreground text-balance leading-tight">
                            전세계 디지털 노마드
                            <br/>
                            <span className="text-primary">도시 정보</span>
                        </h1>
                        <p className="text-xl md:text-2xl dark:text-neutral-200 text-muted-foreground text-pretty max-w-2xl mx-auto">
                            생활비, 인터넷, 날씨를 한눈에 비교하세요
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="flex flex-wrap justify-center gap-8 py-8">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <MapPin className="w-5 h-5 text-primary"/>
                            <span className="text-lg font-medium">50개 도시</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <Globe className="w-5 h-5 text-primary"/>
                            <span className="text-lg font-medium">7개 대륙</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <Users className="w-5 h-5 text-primary"/>
                            <span className="text-lg font-medium">실시간 데이터</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="space-y-4">
                        <Button
                            onClick={scrollToFilters}
                            size="lg"
                            className="bg-primary hover:bg-primary/90 dark:bg-white dark:text-black dark:hover:bg-white/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            도시 둘러보기
                            <ArrowDown className="ml-2 w-5 h-5"/>
                        </Button>
                        <p className="text-sm dark:text-neutral-300 text-muted-foreground">무료로 모든 도시 정보를 확인하세요</p>
                    </div>
                </div>
            </motion.div>
        </AuroraBackground>
    )
}
