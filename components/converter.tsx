"use client"

import * as React from "react"
// heic2any is imported dynamically to avoid SSR window error
import { Upload, X, Download, FileType, CheckCircle, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type ConversionStatus = "pending" | "converting" | "done" | "error"

interface FileItem {
    id: string
    file: File
    name: string
    originalSize: number
    status: ConversionStatus
    progress: number // 0-100
    resultBlob?: Blob
    resultUrl?: string
    errorMsg?: string
}

export function Converter() {
    const [files, setFiles] = React.useState<FileItem[]>([])
    const [isDragOver, setIsDragOver] = React.useState(false)
    const [isProcessing, setIsProcessing] = React.useState(false)

    const processQueue = React.useCallback(async (currentFiles: FileItem[]) => {
        // Determine next file to process
        // We only process one at a time to keep UI responsive

        // Find first pending file
        const nextFileIndex = currentFiles.findIndex(f => f.status === "pending")
        if (nextFileIndex === -1) {
            setIsProcessing(false)
            return
        }

        setIsProcessing(true)
        const nextFile = currentFiles[nextFileIndex]

        // Update status to converting
        setFiles(prev => prev.map((f, i) => i === nextFileIndex ? { ...f, status: "converting", progress: 10 } : f))

        try {
            // Dynamic import
            const heic2any = (await import("heic2any")).default

            // Conversion logic
            const conversionResult = await heic2any({
                blob: nextFile.file,
                toType: "image/png",
                quality: 0.9,
            })

            const blob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult
            const url = URL.createObjectURL(blob)

            setFiles(prev => {
                const newFiles = [...prev]
                newFiles[nextFileIndex] = {
                    ...newFiles[nextFileIndex],
                    status: "done",
                    progress: 100,
                    resultBlob: blob,
                    resultUrl: url
                }

                // Trigger next processing on separate tick
                setTimeout(() => processQueue(newFiles), 100)
                return newFiles
            })

        } catch (err) {
            console.error("Conversion error:", err)
            setFiles(prev => {
                const newFiles = [...prev]
                newFiles[nextFileIndex] = {
                    ...newFiles[nextFileIndex],
                    status: "error",
                    progress: 0,
                    errorMsg: "Failed to convert"
                }
                setTimeout(() => processQueue(newFiles), 100)
                return newFiles
            })
        }

    }, [])

    // Trigger processing when files are added, if not already processing
    React.useEffect(() => {
        // Check if we have pending files and not processing
        const hasPending = files.some(f => f.status === "pending")
        if (hasPending && !isProcessing) {
            processQueue(files)
        }
    }, [files, isProcessing, processQueue])


    const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)

        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            (f) => f.name.toLowerCase().endsWith(".heic") || f.type === "image/heic" || f.type === "" // HEICs sometimes have empty type
        )

        if (droppedFiles.length === 0) return

        const newItems: FileItem[] = droppedFiles.map(f => ({
            id: Math.random().toString(36).substring(7),
            file: f,
            name: f.name,
            originalSize: f.size,
            status: "pending",
            progress: 0
        }))

        setFiles(prev => [...prev, ...newItems])
    }, [])

    const onDragOver = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const onDragLeave = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter(
                (f) => f.name.toLowerCase().endsWith(".heic") || f.type === "image/heic"
            )

            const newItems: FileItem[] = selectedFiles.map(f => ({
                id: Math.random().toString(36).substring(7),
                file: f,
                name: f.name,
                originalSize: f.size,
                status: "pending",
                progress: 0
            }))

            setFiles(prev => [...prev, ...newItems])
        }
        // reset input
        e.target.value = ""
    }

    const removeFile = (id: string) => {
        setFiles(prev => {
            const file = prev.find(f => f.id === id)
            if (file?.resultUrl) URL.revokeObjectURL(file.resultUrl)
            return prev.filter(f => f.id !== id)
        })
    }

    const clearAll = () => {
        files.forEach(f => {
            if (f.resultUrl) URL.revokeObjectURL(f.resultUrl)
        })
        setFiles([])
    }

    const downloadFile = async (file: FileItem) => {
        if (file.resultBlob) {
            const { saveAs } = await import("file-saver")
            saveAs(file.resultBlob, file.name.replace(/\.heic$/i, ".png"))
        }
    }

    const downloadAll = async () => {
        const JSZip = (await import("jszip")).default
        const { saveAs } = await import("file-saver")
        const zip = new JSZip()
        const doneFiles = files.filter(f => f.status === "done" && f.resultBlob)

        if (doneFiles.length === 0) return

        doneFiles.forEach(f => {
            zip.file(f.name.replace(/\.heic$/i, ".png"), f.resultBlob!)
        })

        const content = await zip.generateAsync({ type: "blob" })
        saveAs(content, "converted_images.zip")
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B"
        const k = 1024
        const sizes = ["B", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">

            {/* Drop Zone */}
            <Card
                className={cn(
                    "border-2 border-dashed transition-all cursor-pointer bg-white",
                    isDragOver ? "border-blue-500 bg-blue-50/50" : "border-gray-300 hover:border-gray-400"
                )}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
            >
                <CardContent className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
                    <div className="p-4 bg-blue-50 rounded-full">
                        <Upload className="w-10 h-10 text-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-2xl font-semibold tracking-tight">
                            Drag & Drop HEIC files here
                        </p>
                        <p className="text-gray-500">
                            or click to browse files
                        </p>
                    </div>
                    <div className="relative">
                        <Button size="lg" className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white">
                            Select HEIC Files
                        </Button>
                        <input
                            type="file"
                            aria-label="Upload HEIC files"
                            multiple
                            accept=".heic"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            onChange={handleFileSelect}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">
                            Files ({files.length})
                        </h4>
                        <div className="flex gap-2">
                            {files.some(f => f.status === "done") && (
                                <Button variant="outline" size="sm" onClick={downloadAll}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download All (ZIP)
                                </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={clearAll} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear All
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        {files.map((file) => (
                            <Card key={file.id} className="overflow-hidden">
                                <div className="p-4 flex items-center gap-4">
                                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-500">
                                        <FileType className="w-6 h-6" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="font-medium truncate pr-4">{file.name}</p>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {formatSize(file.originalSize)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                {file.status === "converting" && (
                                                    <div className="h-full bg-blue-500 animate-pulse w-full" style={{ width: '100%' }} />
                                                )}
                                                {file.status === "done" && (
                                                    <div className="h-full bg-green-500 w-full" />
                                                )}
                                                {file.status === "pending" && (
                                                    <div className="h-full" />
                                                )}
                                                {file.status === "error" && (
                                                    <div className="h-full bg-red-500 w-full" />
                                                )}
                                            </div>

                                            <div className="min-w-[100px] flex justify-end">
                                                {file.status === "pending" && (
                                                    <span className="text-xs text-gray-400">Waiting...</span>
                                                )}
                                                {file.status === "converting" && (
                                                    <span className="text-xs text-blue-600 flex items-center">
                                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Converting
                                                    </span>
                                                )}
                                                {file.status === "done" && (
                                                    <Button size="sm" variant="default" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white" onClick={() => downloadFile(file)}>
                                                        <Download className="w-3 h-3 mr-1" />
                                                        Download
                                                    </Button>
                                                )}
                                                {file.status === "error" && (
                                                    <span className="text-xs text-red-500">Error</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
