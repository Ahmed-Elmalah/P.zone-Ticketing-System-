import React from "react";
import { MdDragIndicator, MdEdit, MdDelete } from "react-icons/md";

export default function CategoryItem({ icon, name, ticketCount, iconColor, onEdit, onDelete }) {
  return (
    <div className="group flex items-center justify-between p-lg hover:bg-surface-container-low transition-colors">
      <div className="flex items-center gap-md">
        <MdDragIndicator className="text-outline-variant cursor-grab hover:text-outline" />
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}
        >
          {icon}
        </div>
        <span className="font-body-lg text-on-surface font-medium">{name}</span>
        <span className="bg-surface-container-high text-on-surface-variant font-label-md px-3 py-1 rounded-full ml-sm">
          {ticketCount} Tickets
        </span>
      </div>

      {/* Actions show on hover */}
      <div className="flex items-center gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={onEdit}
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary"
        >
          <MdEdit size={18} />
        </button>
        <button 
          onClick={onDelete}
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error"
        >
          <MdDelete size={18} />
        </button>
      </div>
    </div>
  );
}
