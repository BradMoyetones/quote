import { SiteFooter } from "@/components/site-footer"
import { Header } from "@/components/site-header-animated"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="">
            <Header transition={true} />
            <div className="px-6 max-w-7xl mx-auto">
                {children}
            </div>
            <SiteFooter />
        </div>
    )
}
