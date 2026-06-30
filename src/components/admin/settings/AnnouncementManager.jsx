import React, { useState, useEffect } from "react";
import { MdCampaign, MdSave, MdCheckCircle } from "react-icons/md";
import useAdminStore from "../../../store/useAdminStore";

export default function AnnouncementManager() {
  const { announcement, updateAnnouncement, isLoadingSettings } = useAdminStore();
  const [formData, setFormData] = useState({ message: "", type: "info", isActive: false });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (announcement) {
      setFormData({
        message: announcement.message || "",
        type: announcement.type || "info",
        isActive: announcement.isActive || false
      });
    }
  }, [announcement]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateAnnouncement(formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save announcement", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingSettings) {
    return <div className="animate-pulse bg-surface-container h-64 rounded-xl"></div>;
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 max-w-4xl">
      <div className="p-lg border-b border-outline-variant/20 bg-surface-bright rounded-t-xl flex items-center gap-md">
        <div className="p-sm bg-primary-container/20 text-primary rounded-lg">
          <MdCampaign size={24} />
        </div>
        <div>
          <h3 className="font-headline-md text-on-surface">Global Announcement</h3>
          <p className="font-body-md text-on-surface-variant mt-1">
            Display a site-wide banner for all users (e.g. maintenance, alerts).
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-xl flex flex-col gap-lg">
        {/* Is Active Toggle */}
        <label className="flex items-center gap-md cursor-pointer">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            <div className={`w-14 h-8 rounded-full transition-colors ${formData.isActive ? 'bg-primary' : 'bg-outline-variant'}`}></div>
            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-sm ${formData.isActive ? 'translate-x-6' : ''}`}></div>
          </div>
          <span className="font-label-lg text-on-surface">Enable Banner</span>
        </label>

        {/* Message */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-outline">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="p-md bg-surface-container rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none h-24 text-on-surface"
            placeholder="System will be down for maintenance..."
            disabled={!formData.isActive}
          />
        </div>

        {/* Type */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-outline">Banner Type (Color)</label>
          <div className="flex gap-md">
            {['info', 'warning', 'error'].map(type => (
              <label key={type} className={`flex-1 flex items-center justify-center gap-sm p-sm rounded-lg border cursor-pointer transition-all ${
                formData.type === type 
                  ? 'border-primary bg-primary-container/10 text-primary' 
                  : 'border-outline-variant hover:bg-surface-container-low text-on-surface-variant'
              } ${!formData.isActive ? 'opacity-50 pointer-events-none' : ''}`}>
                <input 
                  type="radio" 
                  name="type" 
                  value={type} 
                  checked={formData.type === type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="sr-only"
                />
                <span className="font-label-md capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end mt-md gap-md items-center">
          {showSuccess && (
            <span className="text-secondary flex items-center gap-xs font-label-md animate-in fade-in">
              <MdCheckCircle /> Saved successfully
            </span>
          )}
          <button 
            type="submit" 
            disabled={isSaving}
            className="flex items-center gap-sm bg-primary text-on-primary px-xl py-sm rounded-full font-button-text hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : <><MdSave size={18} /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
}
