import { siteConfig } from "@/lib/config"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent border-t border-border/50 mt-12">
      <div className="container mx-auto px-4 xl:px-6">
        <div className="py-4 space-y-4">
          {/* Información principal - centrado */}
          <div className="text-muted-foreground text-center text-xs sm:text-sm">
            Construido por{" "}
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Brad Moyetones
            </a>
            . El código fuente está disponible en{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            .
          </div>

          {/* Footer inferior con info legal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border/30 text-xs text-muted-foreground/70">
            {/* Esquina izquierda - Links legales */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <Link href="/terms" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                Términos de uso
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/privacy" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                Política de privacidad
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/cookies" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                Cookies
              </Link>
            </div>

            {/* Esquina derecha - Copyright */}
            <div className="text-center sm:text-right">
              <p>© {new Date().getFullYear()} Quote. Casi todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
