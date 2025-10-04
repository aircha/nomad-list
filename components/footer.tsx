import {Cloud, DollarSign, Github, Instagram, Mail, MapPin, Phone, Twitter, Wifi} from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer
            className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 border-t border-border/50">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(5, 150, 105) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}/>
            </div>

            <div className="relative container mx-auto px-4 py-16">
                {/* Top Section with CTA */}
                <div className="text-center mb-16 pb-16 border-b border-border/50">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 shadow-lg shadow-primary/20">
                        <MapPin className="w-8 h-8 text-primary-foreground"/>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        완벽한 도시를 찾아보세요
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        전 세계 디지털 노마드들이 신뢰하는 도시 정보 플랫폼
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <DollarSign className="w-5 h-5 text-primary"/>
                            <span>생활비 비교</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Wifi className="w-5 h-5 text-primary"/>
                            <span>인터넷 속도</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Cloud className="w-5 h-5 text-primary"/>
                            <span>날씨 정보</span>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                                <span className="text-primary-foreground font-bold text-lg">N</span>
                            </div>
                            <span className="font-bold text-2xl text-foreground">Nomad List</span>
                        </div>
                        <p className="text-muted-foreground max-w-md leading-relaxed">
                            디지털 노마드를 위한 최고의 도시 가이드. 생활비, 인터넷 속도, 날씨, 안전도 등
                            실제 필요한 정보를 한눈에 비교하고, 당신에게 완벽한 도시를 찾아보세요.
                        </p>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4"/>
                                <a href="mailto:air.cha@icloud.com" className="hover:text-primary transition-colors">
                                    air.cha@icloud.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4"/>
                                <span>+82 10 1234 1234</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4"/>
                                <span>대한민국</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <a
                                href="https://codefactory.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-card hover:bg-primary/10 border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                                aria-label="Github"
                            >
                                <Github className="w-5 h-5"/>
                            </a>
                            <a
                                href="https://codefactory.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-card hover:bg-primary/10 border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5"/>
                            </a>
                            <a
                                href="https://codefactory.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-card hover:bg-primary/10 border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5"/>
                            </a>
                            <a
                                href="mailto:air.cha@icloud.com"
                                className="w-10 h-10 rounded-lg bg-card hover:bg-primary/10 border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5"/>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-foreground text-lg">빠른 링크</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#filters"
                                   className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                                    <span
                                        className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200 mr-0 group-hover:mr-2"/>
                                    도시 찾기
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-foreground text-lg">리소스</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#api"
                                   className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                                    <span
                                        className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200 mr-0 group-hover:mr-2"/>
                                    API 문서
                                </a>
                            </li>
                            <li>
                                <a href="#privacy"
                                   className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                                    <span
                                        className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200 mr-0 group-hover:mr-2"/>
                                    개인정보처리방침
                                </a>
                            </li>
                            <li>
                                <a href="#terms"
                                   className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                                    <span
                                        className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200 mr-0 group-hover:mr-2"/>
                                    이용약관
                                </a>
                            </li>
                            <li>
                                <a href="#help"
                                   className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                                    <span
                                        className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200 mr-0 group-hover:mr-2"/>
                                    도움말
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div
                    className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-muted-foreground text-center md:text-left">
                        <p className="font-medium">© {currentYear} Nomad List. All rights reserved.</p>
                        <p className="mt-1 text-xs">Made with passion for Digital Nomads worldwide 🌍</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <a href="#privacy" className="hover:text-primary transition-colors">
                            Privacy
                        </a>
                        <span className="text-border">•</span>
                        <a href="#terms" className="hover:text-primary transition-colors">
                            Terms
                        </a>
                        <span className="text-border">•</span>
                        <a href="#cookies" className="hover:text-primary transition-colors">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
