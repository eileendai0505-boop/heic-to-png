"use client"

import * as React from "react"
import { Upload, Download, CheckCircle, Loader2, RefreshCw, Image as ImageIcon, FileStack } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type ProcessingStatus = 'idle' | 'ready' | 'reading' | 'processing' | 'zipping' | 'completed'

export function Converter() {
    const [status, setStatus] = React.useState<ProcessingStatus>('idle')
    const [files, setFiles] = React.useState<File[]>([])
    const [progress, setProgress] = React.useState(0)
    const [statusText, setStatusText] = React.useState('')
    const [isDragOver, setIsDragOver] = React.useState(false)
    const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null)
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const isValidHeicFile = (file: File) => {
        const name = file.name.toLowerCase()
        const type = file.type.toLowerCase()

        // 1. Check strict MIME type (Good for Desktop)
        if (type === 'image/heic') return true

        // 2. Fallback: Check Extension (REQUIRED for Mobile/iOS where type is empty)
        // We strictly allow only .heic extension as requested
        if (name.endsWith('.heic')) return true

        return false
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 1. Safety Check
        if (!e.target.files || e.target.files.length === 0) return

        const allFiles = Array.from(e.target.files)

        // Filter using the new robust function
        const validFiles = allFiles.filter(isValidHeicFile)

        if (validFiles.length === 0) {
            // Show error only if NO files are valid
            setErrorMsg("No valid HEIC files found in selection.")
            e.target.value = "" // Reset input so they can try again
            return // Stop here, do not proceed to "Ready" state
        }

        if (validFiles.length < allFiles.length) {
            // Optional: Warn if some were skipped, but proceed with valid ones
            // Since we don't have a toast component easily accessible, we might just proceed or show a non-critical error?
            // User requested "Show error only if NO files are valid", so we proceed silently for partial success or maybe specific warning if critical.
            // Let's just proceed with valid ones as per user request flow implies success path for valid files.
        }

        // 3. Update State IMMEDIATELY (Force UI Change)
        setFiles(validFiles)
        setStatus('ready') // <--- Critical: Switch UI from Dropzone to Summary
        setErrorMsg(null) // Clear any previous errors

        // 4. Reset input to allow re-selecting the same file if needed
        e.target.value = ""
    }

    const startConversion = () => {
        if (files.length > 0) {
            processFiles(files)
        }
    }

    const cancelSelection = () => {
        setFiles([])
        setStatus('idle')
        setErrorMsg(null)
    }

    const processFiles = async (filesToProcess: File[]) => {
        // Limits
        const MAX_FILES = 100
        const MAX_SIZE_MB = 50

        if (filesToProcess.length === 0) return

        if (filesToProcess.length > MAX_FILES) {
            setErrorMsg(`Maximum ${MAX_FILES} files allowed at once.`)
            setStatus('ready') // Go back to ready state to let user cancel or retry
            return
        }

        const validFiles: File[] = []
        for (const file of filesToProcess) {
            // The files are already pre-filtered by isValidHeicFile in handleFileSelect and onDrop.
            // We only need to check size here.
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                setErrorMsg(`File "${file.name}" exceeds ${MAX_SIZE_MB}MB limit.`)
                setStatus('ready')
                return
            }
            validFiles.push(file)
        }

        if (validFiles.length === 0) {
            setErrorMsg("No valid HEIC files found in selection.")
            setStatus('ready')
            return
        }

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
                        const newName = file.name.replace(/\.heic$/i, ".png")
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
            setStatus('ready') // Let them try again from ready state
        }
    }

    const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files)

            // Filter using the new robust function
            const validFiles = droppedFiles.filter(isValidHeicFile)

            if (validFiles.length === 0) {
                setErrorMsg("No valid HEIC files found in selection.")
                return
            }

            setFiles(validFiles)
            setStatus('ready')
            setErrorMsg(null)
        }
    }, [])

    const reset = () => {
        setStatus('idle')
        setFiles([])
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
                    onClick={() => fileInputRef.current?.click()} // Allow clicking anywhere on card too
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
                                Bulk convert up to <strong className="font-semibold text-gray-900">100 images</strong> at once. Supports <strong className="font-semibold text-gray-900">HEIC format</strong> (<strong className="font-semibold text-gray-900">Max 50MB</strong> per file).
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button
                                size="lg"
                                className="h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                                onClick={(e) => {
                                    e.stopPropagation() // Prevent double click if parent card also has click
                                    fileInputRef.current?.click()
                                }}
                            >
                                Select HEIC Files
                            </Button>

                            {/* HIDDEN INPUT (NOT opacity-0 overlay) */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept=".heic,.HEIC"
                                multiple
                                className="hidden"
                            />
                        </div>

                        <p className="text-sm text-gray-600 mt-6 pt-4 border-t border-gray-100 w-full max-w-md">
                            Secure, client-side processing for your high-quality Apple photos. No data leaves your device.
                        </p>
                    </CardContent>
                </Card>
            )}

            {status === 'ready' && (
                <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <CardContent className="py-20 px-8 flex flex-col items-center text-center space-y-8">
                        <div className="p-6 bg-blue-50 rounded-full mb-2">
                            <FileStack className="w-16 h-16 text-blue-600" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {files.length} {files.length === 1 ? 'file' : 'files'} selected
                            </h3>
                            <p className="text-gray-500 text-lg">
                                Ready to convert to PNG
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto pt-4">
                            <Button
                                size="lg"
                                onClick={startConversion}
                                className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                            >
                                Start Conversion
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                onClick={cancelSelection}
                                className="w-full h-14 text-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                            >
                                Cancel
                            </Button>
                        </div>
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

