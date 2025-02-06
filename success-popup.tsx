src/components/ui/success-popup.tsx



"use client"

import Image from "next/image"

interface SuccessPopupProps {
  onClose: () => void
}

export default function SuccessPopup({ onClose }: SuccessPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[32px] p-6 pb-4 max-w-md w-full">
        <div className="flex justify-center mb-2">
          <div className="p-4">
            <Image
              src="https://res.cloudinary.com/drkudvyog/image/upload/v1737551267/Confetti_icon_duha_vwui86.png"
              alt="Confetti icon"
              width={48}
              height={48}
            />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2 text-center whitespace-nowrap">
          Your Call Record Has Been Submitted!
        </h2>
        <p className="text-sm mb-6 text-center text-gray-600 leading-relaxed max-w-xs mx-auto">
          The analysis will be ready in Call Analysis within a maximum of 2 minutes.
        </p>
        <div className="mt-6">
          <button
            onClick={() => {
              window.location.href = "https://app.trainedbyai.com/call-records"
            }}
            className="w-full bg-[#5b06be] text-white font-medium py-4 rounded-[20px] text-lg hover:bg-[#5b06be]/90 transition-colors"
          >
            Go to Call Analysis
          </button>
        </div>
      </div>
    </div>
  )
}
