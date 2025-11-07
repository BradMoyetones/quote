import { Package } from "lucide-react"
import { MobileNav } from "./mobile-nav"
import Link from "next/link"

export async function AppHeader() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Shipping Dashboard</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
