import React from 'react';
import { MdErrorOutline, MdInfoOutline, MdWarningAmber } from 'react-icons/md';

export default function SystemAlert({ announcement }) {
  if (!announcement || !announcement.isActive) return null;

  const typeConfig = {
    error: {
      bg: "bg-error-container/20 text-on-surface border-error/30",
      accent: "bg-error",
      iconColor: "text-error",
      icon: MdErrorOutline,
      title: "System Error",
    },
    warning: {
      bg: "bg-tertiary-container/20 text-on-surface border-tertiary/30",
      accent: "bg-tertiary",
      iconColor: "text-tertiary",
      icon: MdWarningAmber,
      title: "System Warning",
    },
    info: {
      bg: "bg-primary-container/20 text-on-surface border-primary/30",
      accent: "bg-primary",
      iconColor: "text-primary",
      icon: MdInfoOutline,
      title: "System Information",
    }
  };

  const config = typeConfig[announcement.type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div className={`${config.bg} rounded-xl p-lg flex items-start gap-md shadow-sm border relative overflow-hidden`}>
      {/* Decorative accent */}
      <div className={`absolute top-0 left-0 w-1.5 h-full ${config.accent}`}></div>
      
      <div className={`mt-1 animate-pulse ${config.iconColor}`}>
        <Icon size={26} />
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className={`font-headline-sm text-headline-sm font-bold ${config.iconColor}`}>
          {config.title}
        </h3>
        <p className="font-body-md text-body-md font-medium text-on-surface opacity-90 leading-relaxed mt-1">
          {announcement.message}
        </p>
      </div>
    </div>
  );
}
