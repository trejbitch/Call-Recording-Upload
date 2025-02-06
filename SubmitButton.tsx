src/components/ui/SubmitButton.tsx



import React from "react"

interface SubmitButtonProps {
  onClick: () => void
}

export default function SubmitButton({ onClick }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#5b06be] text-white font-semibold text-base h-[45px] rounded-[15px] font-montserrat"
    >
      Submit for 10 Credits
    </button>
  )
}
