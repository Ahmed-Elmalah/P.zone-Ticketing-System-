import { useState } from "react";
import { MdImage, MdPictureAsPdf, MdInsertDriveFile } from "react-icons/md";
import ImageModal from "../../shared/ImageModal";

// Pick icon based on file extension
function FileIcon({ name }) {
  if (typeof name !== "string") return <MdInsertDriveFile size={16} className="text-on-surface-variant" />;
  const ext = name.split(".").pop().toLowerCase();
  if (["png", "jpg", "jpeg", "svg", "gif", "webp"].includes(ext))
    return <MdImage size={16} className="text-on-surface-variant" />;
  if (ext === "pdf")
    return <MdPictureAsPdf size={16} className="text-on-surface-variant" />;
  return <MdInsertDriveFile size={16} className="text-on-surface-variant" />;
}

export default function AttachmentChip({ fileName, onClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fileName can be a string or a Strapi media object { id, name, url }
  const name = typeof fileName === "object" && fileName !== null ? fileName.name : fileName;
  const url = typeof fileName === "object" && fileName !== null ? fileName.url : null;
  const safeName = name || "attachment";

  const ext = safeName.split(".").pop().toLowerCase();
  const isImage = ["png", "jpg", "jpeg", "svg", "gif", "webp"].includes(ext);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    
    if (url) {
      const isProd = import.meta.env.PROD;
      const strapiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:1337';
      const fullUrl = isProd ? url : `${strapiBase}${url}`;

      if (isImage) {
        // Open modal for images
        setIsModalOpen(true);
      } else {
        // Fallback for PDF and others
        window.open(fullUrl, "_blank");
      }
    }
  };

  const getFullUrl = () => {
    if (!url) return "";
    const isProd = import.meta.env.PROD;
    const strapiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:1337';
    return isProd ? url : `${strapiBase}${url}`;
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex items-center gap-xs bg-surface-container px-2 py-1 rounded
          border border-outline-variant cursor-pointer hover:bg-surface-variant transition-colors"
      >
        <FileIcon name={safeName} />
        <span className="font-body-md text-body-md text-xs text-on-surface-variant line-clamp-1 max-w-37.5">
          {safeName}
        </span>
      </div>

      {/* Image Modal */}
      {isImage && (
        <ImageModal 
          isOpen={isModalOpen} 
          onClose={(e) => { e.stopPropagation(); setIsModalOpen(false); }} 
          imageUrl={getFullUrl()} 
        />
      )}
    </>
  );
}
