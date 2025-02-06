src/components/ui/upload-options.tsx



 "use client"

import type React from "react"

interface UploadOptionsProps {
  file: File | null
  setFile: (file: File | null) => void
  link: string
  setLink: (link: string) => void
}

export default function UploadOptions({ file, setFile, link, setLink }: UploadOptionsProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="bg-white shadow-md rounded-[20px] p-5 mb-4">
      <h2 className="text-black font-semibold text-base mb-4 font-montserrat">
        Choose how you want to upload your call record.
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload a File</label>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Paste a Link</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste your Google Drive, Dropbox, or OneDrive link here"
          className="w-full rounded-[20px] border border-gray-200 bg-white py-3 px-4 text-sm outline-none focus:border-[#5b06be] focus:ring-1 focus:ring-[#5b06be]"
        />
      </div>
    </div>
  )
}
