src/components/ui/SubmissionPopup.tsx



import React from "react"

interface SubmissionPopupProps {
  onClose: () => void
}

export default function SubmissionPopup({ onClose }: SubmissionPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[20px] p-6 max-w-md w-full">
        <h2 className="text-black font-semibold text-xl mb-2 font-montserrat">Your Call Record Has Been Submitted!</h2>
        <p className="text-black mb-4 font-montserrat">
          The analysis will be ready in Call Analysis within a maximum of 2 minutes.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#5b06be] text-white font-semibold text-base h-[45px] rounded-[15px] font-montserrat"
        >
          Go to Call Analysis
        </button>
      </div>
    </div>
  )
}
