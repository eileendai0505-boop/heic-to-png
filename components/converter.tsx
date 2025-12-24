"use client"

import * as React from "react"
import { Upload, Download, CheckCircle, Loader2, RefreshCw, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type ProcessingStatus = 'idle' | 'reading' | 'processing' | 'zipping' | 'completed'

export function Converter() {
    const [status, setStatus] = React.useState<ProcessingStatus>('idle')
    const [progress, setProgress] = React.useState(0)
    const [statusText, setStatusText] = React.useState('')
    const [isDragOver, setIsDragOver] = React.useState(false)
    const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null)
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

    const processFiles = async (files: File[]) => {
        // Limits
        const MAX_FILES = 100
        const MAX_SIZE_MB = 50

        if (files.length === 0) return

        if (files.length > MAX_FILES) {
            setErrorMsg(`Maximum ${MAX_FILES} files allowed at once.`)
            return
        }

        const validFiles: File[] = []
        for (const file of files) {
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                setErrorMsg(`File "${file.name}" exceeds ${MAX_SIZE_MB}MB limit.`)
                return
            }
            validFiles.push(file)
        }

        if (validFiles.length === 0) return

        setStatus('reading')
        setErrorMsg(null)
        setDownloadUrl(null)

        try {
            // Dynamic imports
            const heic2any = (await import("heic2any")).default
            const JSZip = (await import("jszip")).default
            const { saveAs } = await import("file-saver")

            setStatus('processing')
            const zip = new JSZip()
            let completedCount = 0

            // Queue system
            const concurrency = 3
            const queue = [...validFiles]
            const totalFiles = validFiles.length

            const worker = async () => {
                while (queue.length > 0) {
                    const file = queue.shift()
                    if (!file) break

                    try {
                        const convertedBlob = await heic2any({
                            blob: file,
                            toType: "image/png",
                            quality: 0.8
                        })

                        const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob
                        // Handle filename extension replacement (case insensitive)
                        const newName = file.name.replace(/\.heic$/i, ".png").replace(/\.heif$/i, ".png").replace(/\.avif$/i, ".png")
                        zip.file(newName, blob)
                    } catch (err) {
                        console.error(`Failed to convert ${file.name}`, err)
                    } finally {
                        completedCount++
                        // Update progress
                        const percent = Math.round((completedCount / totalFiles) * 100)
                        setProgress(percent)
                        setStatusText(`Converting ${completedCount}/${totalFiles}...`)
                    }
                }
            }

            // Start concurrent workers
            await Promise.all(Array(Math.min(concurrency, totalFiles)).fill(null).map(worker))

            setStatus('zipping')
            setStatusText('Creating ZIP archive...')

            const zipContent = await zip.generateAsync({ type: "blob" })
            const url = URL.createObjectURL(zipContent)
            setDownloadUrl(url)

            // Auto download
            saveAs(zipContent, "heictopng-converted.zip")

            setStatus('completed')
            setStatusText('Success!')

        } catch (err) {
            console.error("Batch processing error:", err)
            setErrorMsg("An error occurred during processing. Please try again.")
            setStatus('idle')
        }
    }

    const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            (f) => {
                const lowerName = f.name.toLowerCase()
                return lowerName.endsWith(".heic") || lowerName.endsWith(".heif") || lowerName.endsWith(".avif") || f.type === "image/heic" || f.type === ""
            }
        )
        if (droppedFiles.length > 0) {
            processFiles(droppedFiles)
        }
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files).filter(
                (f) => {
                    const lowerName = f.name.toLowerCase()
                    return lowerName.endsWith(".heic") || lowerName.endsWith(".heif") || lowerName.endsWith(".avif") || f.type === "image/heic"
                }
            )
            processFiles(selectedFiles)
        }
        e.target.value = ""
    }

    const reset = () => {
        setStatus('idle')
        setProgress(0)
        setStatusText('')
        if (downloadUrl) {
            URL.revokeObjectURL(downloadUrl)
        }
        setDownloadUrl(null)
        setErrorMsg(null)
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                    {errorMsg}
                </div>
            )}

            {status === 'idle' && (
                <Card
                    className={cn(
                        "rounded-3xl border-2 border-dashed transition-all cursor-pointer bg-white overflow-hidden",
                        isDragOver ? "border-blue-500 bg-blue-50/50 scale-[1.01]" : "border-gray-200 hover:border-blue-400 hover:bg-gray-50/50 shadow-sm hover:shadow-md"
                    )}
                    onDrop={onDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false) }}
                >
                    <CardContent className="flex flex-col items-center justify-center p-10 md:p-14 text-center space-y-6">
                        <div className="p-5 bg-blue-50 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                            <ImageIcon className="w-12 h-12 text-blue-600" />
                        </div>

                        <div className="space-y-3 max-w-lg mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                                Drag & Drop HEIC Files to Convert
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Bulk convert up to <strong className="font-semibold text-gray-900">100 images</strong> at once. Supports HEIC, HEIF, and AVIF formats (<strong className="font-semibold text-gray-900">Max 50MB</strong> per file).
                            </p>
                        </div>

                        <div className="relative pt-4">
                            <Button size="lg" className="relative z-10 h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                                Select HEIC Files
                            </Button>
                            <input
                                type="file"
                                aria-label="Upload HEIC files"
                                multiple
                                accept=".heic,.heif,.avif"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                onChange={handleFileSelect}
                            />
                        </div>

                        <p className="text-sm text-gray-400 mt-6 pt-4 border-t border-gray-100 w-full max-w-md">
                            Secure, client-side processing for your high-quality Apple photos. No data leaves your device.
                        </p>
                    </CardContent>
                </Card>
            )}

            {(status === 'reading' || status === 'processing' || status === 'zipping') && (
                <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
                    <CardContent className="py-20 px-8 flex flex-col items-center text-center space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
                            <div className="relative p-4 bg-blue-50 rounded-full">
                                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                            </div>
                        </div>

                        <div className="w-full max-w-xl space-y-4">
                            <div className="flex justify-between text-base font-semibold text-gray-700">
                                <span className="animate-pulse">{statusText}</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-4 bg-gray-100 [&>div]:bg-blue-600 rounded-full transition-all duration-500" />
                        </div>
                        <p className="text-gray-400 text-sm">Large batches may take a few moments. Please keep this tab open.</p>
                    </CardContent>
                </Card>
            )}

            {status === 'completed' && (
                <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden ring-1 ring-green-100">
                    <CardContent className="py-20 flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-300">
                        <div className="p-5 bg-green-50 rounded-full text-green-600 mb-2">
                            <CheckCircle className="w-16 h-16" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold text-gray-900">Conversion Complete!</h3>
                            <p className="text-gray-500 text-lg">Your ZIP file has started downloading automatically.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
                            {downloadUrl && (
                                <a href={downloadUrl} download="heictopng-converted.zip" className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md hover:shadow-lg transition-all">
                                        <Download className="w-5 h-5 mr-2" />
                                        Download ZIP Again
                                    </Button>
                                </a>
                            )}
                            <Button size="lg" variant="outline" onClick={reset} className="w-full sm:w-auto h-14 text-lg border-2 rounded-full hover:bg-gray-50">
                                <RefreshCw className="w-5 h-5 mr-2" />
                                Convert More Files
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
