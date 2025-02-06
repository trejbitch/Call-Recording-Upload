/src/components/ui/Header.tsx




import React from "react"
import { Upload } from "lucide-react"

export default function Header() {
  return (
    <div className="flex items-start mb-4">
      <Upload className="mr-3 mt-1" size={24} />
      <div>
        <h1 className="text-black font-semibold text-xl mb-1 font-montserrat">
          Upload Your Call Record for an In-Depth Analysis
        </h1>
        <p className="text-black font-medium text-sm font-montserrat">
          Discover exactly what needs improvement to close more deals. (Only 10 credits per analysis.)
        </p>
      </div>
    </div>
  )
}
