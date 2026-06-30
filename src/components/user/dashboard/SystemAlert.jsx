import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

export default function SystemAlert() {
  return (
    <div className="bg-error-container text-error rounded-xl p-lg flex items-start gap-md shadow-sm border border-error/20 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
      
      <div className="mt-1 text-error animate-pulse">
        <MdErrorOutline size={26} />
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="font-headline-sm text-headline-sm font-bold opacity-90">
          حالة الأنظمة والإعلانات
        </h3>
        <p className="font-body-md text-body-md font-medium opacity-90 leading-relaxed mt-1">
          Email Server is currently down for maintenance. We are working on it.
        </p>
      </div>
    </div>
  );
}
