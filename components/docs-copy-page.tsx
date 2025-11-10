"use client"

import { IconCheck, IconCopy } from "@tabler/icons-react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"

export function DocsCopyPage({ page, url }: { page: string; url: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <div className="bg-secondary group/buttons relative flex rounded-lg *:[[data-slot=button]]:focus-visible:relative *:[[data-slot=button]]:focus-visible:z-10">
      <Button
        variant="secondary"
        size="sm"
        className="h-8 shadow-none md:h-7 md:text-[0.8rem]"
        onClick={() => copyToClipboard(page)}
      >
        {isCopied ? <IconCheck /> : <IconCopy />}
        Copiar página
      </Button>
    </div>
  )
}
