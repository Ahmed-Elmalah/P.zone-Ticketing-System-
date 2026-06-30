import React, { useEffect } from "react";
import { MdClose, MdDownload } from "react-icons/md";

export default function ImageModal({ imageUrl, isOpen, onClose }) {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-md z-10">
        <a
          href={imageUrl}
          download
          target="_blank"
          rel="noreferrer"
          className="p-sm bg-surface-container-high/50 hover:bg-surface-container-high rounded-full text-white transition-colors"
          title="Download Image"
        >
          <MdDownload size={24} />
        </a>
        <button
          onClick={onClose}
          className="p-sm bg-surface-container-high/50 hover:bg-error rounded-full text-white transition-colors"
          title="Close"
        >
          <MdClose size={24} />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none">
        <img
          src={imageUrl}
          alt="Attachment"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
        />
      </div>
    </div>
  );
}
