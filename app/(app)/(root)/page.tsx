import { AppHeader } from "@/components/app-header";
import { SiteFooter } from "@/components/site-footer";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Crea tu cotización en segundos"
  }
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <SiteFooter />
    </div>
  );
}
