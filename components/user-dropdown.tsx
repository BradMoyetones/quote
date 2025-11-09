"use client"

import { signOut, useSession } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "./ui/skeleton"
import { useRouter } from "next/navigation"

export default function UserDropdown() {
    const router = useRouter()
    
    const {
        data: session,
        isPending,
    } = useSession()

    if (!isPending && !session) {
        return (
            <Button variant="outline" onClick={() => router.push("/auth")}>
                Iniciar Sesión
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full p-0.5" variant="outline">
                    {isPending ? (
                        <Skeleton className="rounded-full size-8 aspect-square" />
                    ) : (
                        <Avatar>
                            <AvatarImage
                                src={session?.user.image || undefined}
                                alt={session?.user.name || "user"}
                            />
                            <AvatarFallback>
                                {session?.user.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-56">
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">

                        {isPending ? (
                            <Skeleton className="rounded-full size-8" />
                        ) : (
                            <Avatar>
                                <AvatarImage
                                    src={session?.user.image || undefined}
                                    alt={session?.user.name || "user"}
                                />
                                <AvatarFallback>
                                    {session?.user.name?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        )}

                        <div className="grid flex-1 text-left text-sm leading-tight">
                            {isPending ? (
                                <>
                                    <Skeleton className="h-4 w-24 mb-1" />
                                    <Skeleton className="h-3 w-32" />
                                </>
                            ) : (
                                <>
                                    <span className="truncate font-medium">
                                        {session?.user.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {session?.user.email}
                                    </span>
                                </>
                            )}
                        </div>

                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={async () => {
                        await signOut({
                            fetchOptions: {
                                onSuccess: () => router.push("/"),
                            },
                        })
                    }}
                >
                    {isPending ? (
                        <Skeleton className="h-4 w-24" />
                    ) : ("Cerrar Sesión")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
