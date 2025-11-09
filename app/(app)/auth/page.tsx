'use client'

import { GithubStarsLogo } from "@/components/animate-ui/primitives/animate/github-stars";
import GoogleLogo from "@/components/icons/google-icon";
import { Logo } from "@/components/logo-delta";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { MotionEffect } from "@/components/effects/motion-effect";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function AuthPage() {
    const [tab, setTab] = useState("login")

    const TITLE = tab === "login" ? "Inicia Sesión" : "Crea una Cuenta";
    const PARAGRAPH = tab === "login" ? "Bienvenido de nuevo! Inicia Sesión para continuar" : "Bienvenido! Crea una cuenta para empezar";
    

    async function handleProviderLogin(provider: "google" | "github") {
        try {
            const res = await signIn.social({
                provider,
                callbackURL: "/" // redirigir al home después de login
            })

            if (res.error) {
                toast.error("Hubo un error al iniciar sesión.")
            }
        } catch (error) {
            console.error(error)
            toast.error("Algo salió mal. Intenta de nuevo.")
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
                <form
                    action=""
                    className="max-w-92 m-auto h-fit w-full"
                    key={tab}
                >
                    <div className="p-6">
                        <div>
                            <MotionEffect
                                slide={{
                                    direction: 'left',
                                }}
                                fade
                                zoom
                                delay={0.1}
                            >
                                <Link
                                    href="/"
                                    aria-label="go home"
                                >
                                    <Logo />
                                </Link>
                            </MotionEffect>
                            <MotionEffect
                                slide={{
                                    direction: 'down',
                                }}
                                fade
                                zoom
                                delay={0.15}
                            >
                                <h1 
                                    className="mb-1 mt-4 text-xl font-semibold"
                                >
                                    {TITLE}
                                </h1>
                            </MotionEffect>

                            <MotionEffect
                                slide={{
                                    direction: 'down',
                                }}
                                fade
                                zoom
                                delay={0.2}
                            >
                                <p>
                                    {PARAGRAPH}
                                </p>
                            </MotionEffect>
                        </div>

                        <div className="mt-6 space-y-2">
                            <MotionEffect
                                slide={{
                                    direction: 'down',
                                }}
                                fade
                                zoom
                                delay={0.25}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleProviderLogin("google")}
                                >
                                    <GoogleLogo className="size-6" />
                                    <span>Google</span>
                                </Button>
                            </MotionEffect>


                            <MotionEffect
                                slide={{
                                    direction: 'down',
                                }}
                                fade
                                zoom
                                delay={0.3}
                            >
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    className="w-full"
                                    onClick={() => handleProviderLogin("github")}
                                >
                                    <GithubStarsLogo className="size-6" />
                                    GitHub
                                </Button>
                            </MotionEffect>
                        </div>
                    </div>

                    <MotionEffect
                        slide={{
                            direction: 'down',
                        }}
                        fade
                        zoom
                        delay={0.35}
                    >
                        <p className="text-accent-foreground text-center text-sm">
                            {tab === "login" ? "¿Aun no tienes Cuenta?" : "¿Ya tienes una cuenta?"}
                            <Button
                                variant="link"
                                className="px-2"
                                type="button"
                                onClick={() => setTab((value) => value === "login" ? "singup" : "login")}
                            >
                                {tab === "login" ? "Crear Cuenta" : "Iniciar Sesión"}
                            </Button>
                        </p>
                    </MotionEffect>
                </form>
            </section>
            
        </div>
    )
}

