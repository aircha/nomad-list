"use client"

import {Button} from "@/components/ui/button"

export function Header() {
    const scrollToFilters = () => {
        const filtersSection = document.getElementById("filters")
        if (filtersSection) {
            filtersSection.scrollIntoView({behavior: "smooth"})
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">N</span>
                    </div>
                    <span className="font-bold text-xl text-foreground">Nomad List</span>
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                    <button onClick={scrollToFilters}
                            className="text-muted-foreground hover:text-foreground transition-colors">
                        도시 찾기
                    </button>
                    <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                        소개
                    </a>
                    <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                        문의
                    </a>
                </nav>

                <Button onClick={scrollToFilters} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    시작하기
                </Button>
            </div>
        </header>
    )
}
