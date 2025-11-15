'use client'

import { useRef, useState } from 'react'
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ZoomIn, ZoomOut } from 'lucide-react'

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

// Dimensiones de diferentes tamaños de papel
const PAPER_SIZES = {
    A4: { width: 210, height: 297, label: 'A4' },
    Letter: { width: 216, height: 279, label: 'Letter' },
    Legal: { width: 216, height: 356, label: 'Legal' },
    A3: { width: 297, height: 420, label: 'A3' },
    A5: { width: 148, height: 210, label: 'A5' },
}

export default function DocumentViewer() {
    const [paperSize, setPaperSize] = useState<keyof typeof PAPER_SIZES>('A4')
    const [zoom, setZoom] = useState(1)
    const [headerContent, setHeaderContent] = useState('Cabecera del Documento')
    const [editingHeader, setEditingHeader] = useState(headerContent)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const wrapperRef = useRef<ReactZoomPanPinchRef>(null)

    const currentSize = PAPER_SIZES[paperSize]
    const mmToPx = 3.78 // Conversión aproximada de mm a px

    const handleSaveHeader = () => {
        setHeaderContent(editingHeader)
        setIsDialogOpen(false)
    }

    return (
        <div className="flex w-full bg-background">
            {/* Panel Izquierdo - Blanco */}
            <ResizablePanelGroup
                direction="horizontal"
                className="rounded-lg border"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                        <p className="text-center">Panel de Control</p>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    
                    {/* Panel Derecho - Visor de Documentos */}
                    <div className="flex-1 flex flex-col bg-background h-[calc(100vh-64px-33px)]">
                        {/* Controles Superior */}
                        <div className="flex gap-4 flex-wrap items-center bg-card p-4 border-b border-border">
                            {/* Selector de Tamaño de Papel */}
                            <div className="flex items-center gap-2">
                                <Label htmlFor="paper-size" className="whitespace-nowrap">
                                    Tamaño:
                                </Label>
                                <Select value={paperSize} onValueChange={(value) => setPaperSize(value as keyof typeof PAPER_SIZES)}>
                                    <SelectTrigger id="paper-size" className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(PAPER_SIZES).map(([key, { label }]) => (
                                            <SelectItem key={key} value={key}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Controles de Zoom */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => wrapperRef.current?.zoomOut(0.06, 200, "linear")}
                                >
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                                <Button className="font-bold" variant={"ghost"} size={"sm"}>
                                    {Math.round(zoom * 100)}%
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => wrapperRef.current?.zoomIn(0.06, 200, "linear")}
                                >
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Reset Zoom */}
                            <Button
                                variant="outline"
                                onClick={() => {
                                    wrapperRef.current?.setTransform(0, 0, 0.9, 400, "easeOut")
                                }}
                            >
                                Reset Zoom
                            </Button>
                        </div>

                        {/* Área de Visor */}
                        <div className="flex-1 bg-muted flex items-center justify-center">
                            <TransformWrapper
                                ref={wrapperRef}
                                initialScale={0.9}
                                limitToBounds={false}
                                minScale={0.5}
                                maxScale={1.5}
                                onTransformed={(ref) => {
                                    setZoom(ref.state.scale)
                                }}
                                smooth
                                pinch={{ step: 5 }}
                            >
                                {({ }) => (
                                <>
                                    <TransformComponent
                                        wrapperClass="w-full! h-full!"
                                        contentClass="flex items-center justify-center"
                                    >
                                        {/* Documento */}
                                        <div
                                            style={{
                                                width: `${currentSize.width * mmToPx}px`,
                                                height: `${currentSize.height * mmToPx}px`,
                                                scale: zoom,
                                            }}
                                            className="bg-white shadow-2xl flex flex-col"
                                        >
                                            {/* Cabecera Editable */}
                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <div className="bg-blue-50 border-b-2 border-blue-200 p-6 cursor-pointer hover:bg-blue-100 transition-colors">
                                                        <h2 className="text-xl font-bold text-gray-800">
                                                            {headerContent}
                                                        </h2>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            Click para editar
                                                        </p>
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Editar Cabecera del Documento</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="header-input">Contenido</Label>
                                                            <Input
                                                            id="header-input"
                                                            value={editingHeader}
                                                            onChange={(e) => setEditingHeader(e.target.value)}
                                                            placeholder="Ingresa el contenido de la cabecera"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setIsDialogOpen(false)}
                                                        >
                                                            Cancelar
                                                        </Button>
                                                        <Button onClick={handleSaveHeader}>
                                                            Guardar
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            {/* Contenido de la Página */}
                                            <div className="flex-1 p-8 overflow-auto">
                                                <div className="text-gray-700 space-y-4">
                                                    <p className="leading-relaxed">
                                                        Este es el contenido principal del documento. 
                                                        Puedes agregar más contenido aquí como lo desees.
                                                    </p>
                                                    <p className="leading-relaxed">
                                                        El documento tiene dimensiones reales de {currentSize.label} 
                                                        ({currentSize.width}mm x {currentSize.height}mm).
                                                    </p>
                                                    <p className="leading-relaxed">
                                                        Puedes hacer zoom, pan y pinch para navegar por el documento.
                                                        Haz click en la cabecera para editarla.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </TransformComponent>
                                </>
                                )}
                            </TransformWrapper>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
