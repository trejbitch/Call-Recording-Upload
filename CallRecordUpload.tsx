src/components/ui/CallRecordUpload.tsx



import React, { useState } from "react"
import { Upload } from "lucide-react"
import Header from "./Header"
import UploadOptions from "./UploadOptions"
import SubmitButton from "./SubmitButton"
import SubmissionPopup from "./SubmissionPopup"

export default function CallRecordUpload() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [link, setLink] = useState("")

  const handleSubmit = () => {
    if (file || link) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="bg-[#f2f3f8] p-6 rounded-[20px]">
      <div className="bg-white p-5 rounded-[20px]">
        <Header />
        <UploadOptions file={file} setFile={setFile} link={link} setLink={setLink} />
        <SubmitButton onClick={handleSubmit} />
      </div>
      {isSubmitted && <SubmissionPopup onClose={() => setIsSubmitted(false)} />}
    </div>
  )
}
