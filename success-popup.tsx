src/components/ui/success-popup.tsx






"use client"

import Image from "next/image"
import { useEffect } from "react"

interface SuccessPopupProps {
  onClose: () => void
}

export default function SuccessPopup({ onClose }: SuccessPopupProps) {
  // Handle clicks outside the popup to close it
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the click is on the overlay (the popup's background)
      if (target.classList.contains('popup-overlay')) {
        onClose();
      }
    };
    
    // Add the event listener
    document.addEventListener('click', handleOutsideClick);
    
    // Clean up on unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 popup-overlay">
      <div className="bg-white rounded-[32px] p-4 pb-4 max-w-md w-full border border-[#ddd]">
        <div className="flex justify-center mb-2">
          <div className="p-3">
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
            onClick={onClose}
            className="w-full bg-[#5b06be] text-white font-bold h-[52px] rounded-[20px] text-lg hover:bg-[#5b06be]/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
