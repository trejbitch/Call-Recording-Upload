// src/app/embed/call-recording-upload/page.tsx


import CallRecordUpload from "@/components/ui/call-record-upload"

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <CallRecordUpload />
    </div>
  )
}
