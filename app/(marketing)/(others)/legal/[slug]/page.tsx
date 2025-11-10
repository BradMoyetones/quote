import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getContent } from "@/utils/utils";
import { getTableOfContents } from 'fumadocs-core/content/toc';

import { DocsTableOfContents } from "@/components/docs-toc";
import { TableOfContents } from "fumadocs-core/toc";
import { DocsCopyPage } from "@/components/docs-copy-page"
import { absoluteUrl } from "@/lib/utils"

interface LagalParams {
    params: Promise<{ slug?: string }>
}

function extractTOC(content: string): TableOfContents {
    try {
        const tocItems = getTableOfContents(content)

        return tocItems
    } catch (error) {
        console.error("Error generating TOC with fumadocs:", error)
        // Fallback to manual extraction
        const toc: TableOfContents = []
        const headingRegex = /^(#{2,4})\s+(.+)$/gm
        let match

        while ((match = headingRegex.exec(content)) !== null) {
            const depth = match[1].length
            const title = match[2].trim()
            const id = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
            toc.push({ title, url: `#${id}`, depth })
        }

        return toc
    }
}

export async function generateStaticParams() {
    
    const allPosts: { slug: string }[] = [];

    // Fetch posts for each locale
    const posts = getContent('legal', "es");
    allPosts.push(...posts.map(post => ({
        slug: post.slug,
    })));

    return allPosts;
}

export default async function Legal({ params }: LagalParams) {
    const {slug} = await params
    const legal = getContent("legal").find((post) => post.slug === slug);
    
    if (!legal) {
        notFound();
    }

    const tocItems = extractTOC(legal.content)

    return (
        <div className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full @container">

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 py-6 md:px-0 lg:py-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                                {legal.metadata.title}
                            </h1>
                            <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                                <DocsCopyPage
                                    page={legal.content}
                                    url={absoluteUrl("#")}
                                />
                            </div>
                        </div>
                        {legal.metadata.summary && (
                            <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                                {legal.metadata.summary}
                            </p>
                        )}
                        </div>
                    </div>
                    <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0 @container">
                        <CustomMDX source={legal.content} />
                    </div>
                </div>
            </div>

            <div className="sticky top-[53px] ml-auto hidden h-screen w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 @xl:flex">
                {tocItems.length > 0 ? (
                    <div className="no-scrollbar overflow-y-auto px-8 pt-6">
                        <DocsTableOfContents toc={tocItems} />
                        <div className="h-12" />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
