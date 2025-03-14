src/components/ui/call-record-upload.tsx







"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import SuccessPopup from "./success-popup";

const ACCEPTED_CLOUD_STORAGE = ["drive.google.com", "dropbox.com", "onedrive.live.com"];

export default function CallRecordUpload() {
  // Link state
  const [linkUrl, setLinkUrl] = useState("");
  const [linkError, setLinkError] = useState<string | null>(null);
  const [isSubmittingLink, setIsSubmittingLink] = useState(false);
  
  // Form state
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Get member data from URL params and/or Memberstack
  useEffect(() => {
    try {
      // First check URL parameters
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlMemberId = urlParams.get('memberId');
        const urlTeamId = urlParams.get('teamId');
        
        if (urlMemberId) {
          console.log('Found memberId in URL:', urlMemberId);
          setMemberId(urlMemberId);
        }
        
        if (urlTeamId) {
          console.log('Found teamId in URL:', urlTeamId);
          setTeamId(urlTeamId);
        }
        
        // Also try to get from Memberstack as backup
        if (window.$memberstackDom) {
          window.$memberstackDom.getCurrentMember()
            .then(({ data: member }) => {
              if (member) {
                console.log('Found Memberstack member:', member.id);
                if (!urlMemberId) setMemberId(member.id);
                // Get teamId from custom fields if not in URL
                if (!urlTeamId && member.customFields && member.customFields.tid) {
                  console.log('Found teamId in Memberstack:', member.customFields.tid);
                  setTeamId(member.customFields.tid);
                }
              } else {
                console.log('No Memberstack member found');
              }
            })
            .catch(err => {
              console.error('Error getting member data:', err);
            });
        } else {
          console.log('Memberstack not available');
        }
      }
    } catch (error) {
      console.error('Error accessing parameters or Memberstack:', error);
    }
  }, []);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLink = e.target.value;
    setLinkUrl(inputLink);
    setLinkError(null);

    if (inputLink) {
      try {
        const url = new URL(inputLink);
        if (!ACCEPTED_CLOUD_STORAGE.some((domain) => url.hostname.includes(domain))) {
          setLinkError("Please use Google Drive, Dropbox, or OneDrive links.");
        }
      } catch {
        setLinkError("Please enter a valid URL.");
      }
    }
  };

  const resetForm = () => {
    setLinkUrl("");
    setLinkError(null);
    setShowSuccess(false);
    setNotes("");
  };

  const handleSubmitLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!linkUrl) {
      setLinkError('Please enter a valid URL');
      return;
    }
    
    if (!memberId) {
      setErrorMessage('Could not identify your member account. Please log in again.');
      return;
    }

    setIsSubmittingLink(true);
    setErrorMessage(null);
    
    try {
      console.log('Submitting link with:', { linkUrl, memberId, teamId, notes });
      
      const response = await fetch(`/api/call-records-upload?memberId=${memberId}${teamId ? `&teamId=${teamId}` : ''}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'link',
          url: linkUrl,
          notes,
          teamId: teamId || undefined
        }),
      });

      console.log('Response status:', response.status);
      
      let responseData;
      try {
        responseData = await response.json();
        console.log('Response data:', responseData);
      } catch (error) {
        console.error('Error parsing response:', error);
        const text = await response.text();
        console.log('Response text:', text);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to submit link');
      }

      // Success - show popup
      setShowSuccess(true);
      
    } catch (error: any) {
      console.error('Link submission error:', error);
      setErrorMessage(error.message || 'Failed to submit call record link');
    } finally {
      setIsSubmittingLink(false);
    }
  };

  const isLinkSubmitEnabled = linkUrl && !linkError;

  return (
    <div className="w-full bg-white" style={{ margin: 0, padding: 0, marginTop: '-1px' }}>
      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-md bg-red-100 text-red-800 border border-red-200">
          Failed to submit call record
        </div>
      )}

      <div className="rounded-lg bg-white p-4 border border-[#ddd]">
        <div className="flex items-center gap-2 mb-3">
          <Image
            src="https://res.cloudinary.com/drkudvyog/image/upload/v1737556779/Paste_link_icon_v5glok.png"
            alt="Paste link icon"
            width={20}
            height={20}
          />
          <h3 className="text-lg font-bold text-black">Submit Call Recording Link</h3>
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Paste your Google Drive, Dropbox, or OneDrive link here"
            value={linkUrl}
            onChange={handleLinkChange}
            className="w-full rounded-[20px] border border-[#ddd] bg-white py-3 px-4 text-sm outline-none focus:border-[#5b06be] focus:ring-1 focus:ring-[#5b06be]"
          />
          <p className="mt-1 text-xs text-gray-500 pl-3">
            Link must be public/shareable and point to an MP3, WAV, or M4A file
          </p>
          {linkError && (
            <div className="mt-1 flex items-center gap-2 text-sm text-red-500 pl-3">
              <AlertCircle className="h-4 w-4" />
              {linkError}
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <h3 className="mb-2 font-medium text-black">Notes (Optional)</h3>
          <textarea
            placeholder="Add any notes about this recording"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-[20px] border border-[#ddd] bg-white py-3 px-4 text-sm outline-none focus:border-[#5b06be] focus:ring-1 focus:ring-[#5b06be]"
            rows={4}
          />
        </div>

        <button
          onClick={handleSubmitLink}
          disabled={!isLinkSubmitEnabled || isSubmittingLink}
          className={`mt-0 rounded-[20px] px-6 py-3 text-base font-bold text-white ${
            isLinkSubmitEnabled && !isSubmittingLink
              ? "bg-[#5b06be] hover:bg-[#5b06be]/90" 
              : "bg-[#5b06be]/40 cursor-not-allowed"
          }`}
        >
          {isSubmittingLink ? "Submitting..." : "Submit for 10 Credits"}
        </button>
      </div>

      {/* Use the imported SuccessPopup component */}
      {showSuccess && <SuccessPopup onClose={resetForm} />}
    </div>
  );
}
