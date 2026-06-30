import { MdImage, MdPictureAsPdf, MdInsertDriveFile } from "react-icons/md";

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
  // fileName can be a string or a Strapi media object { id, name, url }
  const name = typeof fileName === "object" && fileName !== null ? fileName.name : fileName;
  const url = typeof fileName === "object" && fileName !== null ? fileName.url : null;
  const safeName = name || "attachment";

  const handleClick = (e) => {
    if (onClick) onClick(e);
    else if (url) {
      window.open(`http://localhost:1337${url}`, "_blank");
    }
  };

  return (
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
  );
}
