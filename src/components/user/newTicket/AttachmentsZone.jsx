// ============================================================
// AttachmentsZone.jsx
// Drag-and-drop file upload zone.
// Supports click-to-browse + drag-and-drop.
// Shows list of selected files below the zone.
// ============================================================

import { useState, useRef } from "react";
import { MdCloudUpload, MdInsertDriveFile, MdClose } from "react-icons/md";

// Max file size: 10MB in bytes
const MAX_SIZE = 10 * 1024 * 1024;

export default function AttachmentsZone() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  // Add files — filter out duplicates and oversized files
  const addFiles = (newFiles) => {
    const valid = Array.from(newFiles).filter(
      (f) => f.size <= MAX_SIZE && !files.find((ex) => ex.name === f.name),
    );
    setFiles((prev) => [...prev, ...valid]);
  };

  // Remove a file from the list
  const removeFile = (name) =>
    setFiles((prev) => prev.filter((f) => f.name !== name));

  // Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-sm">
      {/* Label */}
      <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
        Attachments
      </span>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full border-2 border-dashed rounded-xl p-10
          flex flex-col items-center justify-center cursor-pointer group transition-all
          ${
            isDragging
              ? "border-primary bg-surface-container-low"
              : "border-outline-variant bg-surface-container-low hover:bg-surface-container-lowest hover:border-primary"
          }`}
      >
        {/* Cloud upload icon */}
        <div
          className="h-16 w-16 rounded-full bg-primary-container text-on-primary
          flex items-center justify-center mb-md group-hover:scale-110 transition-transform"
        >
          <MdCloudUpload size={32} />
        </div>

        <p className="font-body-md text-body-md font-semibold text-on-surface mb-xs">
          Click to upload or drag and drop
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant">
          SVG, PNG, JPG or PDF (max. 10MB)
        </p>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".svg,.png,.jpg,.jpeg,.pdf"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Selected files list */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-xs mt-xs">
          {files.map((file) => (
            <li
              key={file.name}
              className="flex items-center justify-between px-md py-sm
                bg-surface-container-low rounded-lg border border-outline-variant"
            >
              <div className="flex items-center gap-sm text-on-surface">
                <MdInsertDriveFile size={18} className="text-primary" />
                <span className="font-body-md text-body-md truncate max-w-xs">
                  {file.name}
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </div>

              {/* Remove file button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(file.name);
                }}
                className="text-on-surface-variant hover:text-error transition-colors"
              >
                <MdClose size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
