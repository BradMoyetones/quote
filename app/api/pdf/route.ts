// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("better-auth.session_token")?.value;
        const state = cookieStore.get("better-auth.state")?.value;

        if (!session || !state) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { id, format = "A4" } = await req.json();

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        // Setear cookies en Puppeteer
        await browser.setCookie(
            {
                name: "better-auth.session_token",
                value: session,
                domain: "miapp.com",
                path: "/",
                httpOnly: true,
                secure: true,
            },
            {
                name: "better-auth.state",
                value: state,
                domain: "miapp.com",
                path: "/",
                httpOnly: true,
                secure: true,
            }
        )

        const url = `https://miapp.com/document/print/${id}`;
        await page.goto(url, { waitUntil: "networkidle0" });

        const pdf = await page.pdf({
            format,
            printBackground: true,
        });

        await browser.close();

        const uint8 = new Uint8Array(pdf);

        const cleanBuffer = uint8.buffer.slice(
            uint8.byteOffset,
            uint8.byteOffset + uint8.byteLength
        );

        return new NextResponse(cleanBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename=document-${id}.pdf`,
            },
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error generating PDF" }, { status: 500 });
    }
}
