src/components/ui/call-record-upload.tsx




"use client"

import { useState } from "react"
import Image from "next/image"
import { AlertCircle } from "lucide-react"
import SuccessPopup from "./success-popup"

const ACCEPTED_FORMATS = [".mp3", ".wav", ".m4a"]
const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_CLOUD_STORAGE = ["drive.google.com", "dropbox.com", "onedrive.live.com"]

export default function CallRecordUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [link, setLink] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)

    if (selectedFile) {
      if (!ACCEPTED_FORMATS.some((format) => selectedFile.name.toLowerCase().endsWith(format))) {
        setError("Invalid file format. Please upload MP3, WAV, or M4A files.")
        setFile(null)
      } else if (selectedFile.size > MAX_FILE_SIZE) {
        setError("File size exceeds 100MB limit.")
        setFile(null)
      } else {
        setFile(selectedFile)
      }
    }
  }

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLink = e.target.value
    setLink(inputLink)
    setError(null)

    if (inputLink) {
      try {
        const url = new URL(inputLink)
        if (!ACCEPTED_CLOUD_STORAGE.some((domain) => url.hostname.includes(domain))) {
          setError("Please use Google Drive, Dropbox, or OneDrive links.")
        }
      } catch {
        setError("Please enter a valid URL.")
      }
    }
  }

  const handleSubmit = () => {
    setSubmitError(null)
    if (!file && !link) {
      setSubmitError("Please either upload a file or enter a valid URL.")
    } else if ((file && !error) || (link && !error)) {
      setShowSuccess(true)
    }
  }

  const resetForm = () => {
    setFile(null)
    setLink("")
    setError(null)
    setSubmitError(null)
    setShowSuccess(false)
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <div className="w-full">
      <div className="w-full rounded-[32px] bg-white p-8 pb-6 shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Image
              src="https://res.cloudinary.com/drkudvyog/image/upload/v1737501558/Upload_call_record_icon_duha_xugenl.png"
              alt="Upload call record icon"
              width={24}
              height={24}
              className="mt-1"
            />
            <div>
              <h1 className="mb-1 text-2xl font-bold text-gray-900">
                Upload Your Call Recording for an In-Depth Analysis
              </h1>
              <p className="text-sm font-medium text-black font-montserrat">
                Discover exactly what needs improvement to close more deals. (Only 10 credits per analysis.)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              window.location.href = "https://app.trainedbyai.com/call-records"
            }}
            className="inline-flex rounded-[20px] bg-[#f8b922] px-6 py-3 text-base font-medium font-inter text-white transition-colors hover:bg-[#f8b922]/90"
          >
            Go to Call Recordings Analysis
          </button>
        </div>

        <div className="rounded-[24px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
          <h2 className="mb-0.5 text-lg font-semibold text-[#5b06be]">
            Choose how you want to upload your call recording.
          </h2>
          <p className="text-sm text-black mb-5">Please choose one of the following options:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
            <div className="flex flex-col items-start p-6 rounded-[24px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
              <h3 className="text-lg font-semibold text-[#f8b922] mb-4 self-start flex items-center">
                <Image
                  src="https://res.cloudinary.com/drkudvyog/image/upload/v1733750646/upload_icon_bjsfxf.png"
                  alt="Upload icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Option 1: Upload a File
              </h3>
              <div className="w-full flex justify-center">
                <label className="group relative block w-full cursor-pointer rounded-[20px] border-2 border-dashed border-gray-200 py-1.5 px-1 hover:border-[#5b06be]/20">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept={ACCEPTED_FORMATS.join(",")}
                  />
                  <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-[#5b06be] px-2">
                    <span className="rounded-[15px] bg-[#f8b922] text-white px-3 py-1.5 font-medium">Choose File</span>
                    {file ? file.name : "No file chosen"}
                  </div>
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500 self-start pl-3">
                Accepted formats: MP3 (recommended), WAV, M4A. Max file size: 100MB
              </p>
            </div>
            <div className="flex flex-col items-start p-6 rounded-[24px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
              <h3 className="text-lg font-semibold text-[#f8b922] mb-4 self-start flex items-center">
                <Image
                  src="https://res.cloudinary.com/drkudvyog/image/upload/v1737556779/Paste_link_icon_v5glok.png"
                  alt="Paste link icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Option 2: Paste a Link
              </h3>
              <input
                type="text"
                placeholder="Paste your Google Drive, Dropbox, or OneDrive link here"
                value={link}
                onChange={handleLinkChange}
                className="w-full rounded-[20px] border border-gray-200 bg-white py-3 px-4 text-sm outline-none focus:border-[#5b06be] focus:ring-1 focus:ring-[#5b06be]"
              />
              <p className="mt-2 text-xs text-gray-500 self-start pl-3">
                Link must be public/shareable and point to an MP3, WAV, or M4A file
              </p>
            </div>
          </div>

          {(error || submitError) && (
            <div className="mt-2 mb-4 flex items-center gap-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" />
              {submitError || error}
            </div>
          )}

          <div className="flex justify-start w-full mt-0">
            <button
              onClick={handleSubmit}
              className="inline-flex self-start rounded-[20px] bg-[#5b06be] px-6 py-3 text-base font-medium font-inter text-white transition-colors hover:bg-[#5b06be]/90"
            >
              Submit for 10 Credits
            </button>
          </div>
        </div>
      </div>

      {showSuccess && <SuccessPopup onClose={resetForm} />}
    </div>
  )
}
