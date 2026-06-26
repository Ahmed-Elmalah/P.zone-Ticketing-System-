// ============================================================
// AttachmentChip.jsx
// Small chip that shows an attached file inside a message.
//
// Props:
//   fileName - name of the attached file
//   onClick  - optional click handler (e.g. open/download)
// ============================================================

import { MdImage, MdPictureAsPdf, MdInsertDriveFile } from "react-icons/md";

// Pick icon based on file extension
function FileIcon({ name }) {
  const ext = name.split(".").pop().toLowerCase();
  if (["png", "jpg", "jpeg", "svg", "gif", "webp"].includes(ext))
    return <MdImage size={16} className="text-on-surface-variant" />;
  if (ext === "pdf")
    return <MdPictureAsPdf size={16} className="text-on-surface-variant" />;
  return <MdInsertDriveFile size={16} className="text-on-surface-variant" />;
}

export default function AttachmentChip({ fileName = "file", onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-xs bg-surface-container px-2 py-1 rounded
        border border-outline-variant cursor-pointer hover:bg-surface-variant transition-colors"
    >
      <FileIcon name={fileName} />
      <span className="font-body-md text-body-md text-xs text-on-surface-variant">
        {fileName}
      </span>
    </div>
  );
}
