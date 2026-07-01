import React, { useState } from "react";
import { MdLink, MdAdd, MdDelete, MdEdit } from "react-icons/md";
import useAdminStore from "../../../store/useAdminStore";

export default function QuickActionsManager() {
  const { quickActions, addQuickAction, removeQuickAction, isLoadingSettings } = useAdminStore();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: "", url: "", icon: "MdLink" });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;
    try {
      await addQuickAction(formData);
      setFormData({ title: "", url: "", icon: "MdLink" });
      setIsAdding(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoadingSettings) {
    return <div className="animate-pulse bg-surface-container h-64 rounded-xl"></div>;
  }

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-outline-variant max-w-4xl overflow-hidden">
      <div className="p-lg border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
        <div className="flex items-center gap-md">
          <div className="p-sm bg-tertiary-container/20 text-tertiary rounded-lg">
            <MdLink size={24} />
          </div>
          <div>
            <h3 className="font-headline-md text-on-surface">Quick Actions</h3>
            <p className="font-body-md text-on-surface-variant mt-1">
              Manage helpful links shown on the user dashboard.
            </p>
          </div>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-xs bg-tertiary text-on-tertiary px-md py-sm rounded-full font-button-text hover:bg-tertiary/90 transition-colors"
          >
            <MdAdd size={18} /> Add Link
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="p-lg border-b border-outline-variant bg-surface-container-low flex flex-col sm:flex-row gap-md items-end">
          <div className="flex-1 w-full">
            <label className="font-label-md text-outline mb-xs block">Title</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-sm bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-tertiary outline-none"
              placeholder="e.g., HR Portal"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="font-label-md text-outline mb-xs block">URL</label>
            <input 
              type="url" 
              required
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="w-full p-sm bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-tertiary outline-none"
              placeholder="https://hr.example.com"
            />
          </div>
          <div className="flex gap-sm w-full sm:w-auto">
            <button type="button" onClick={() => setIsAdding(false)} className="px-md py-sm text-on-surface-variant hover:bg-surface-container rounded-lg font-button-text">
              Cancel
            </button>
            <button type="submit" className="px-md py-sm bg-tertiary text-on-tertiary rounded-lg font-button-text">
              Save
            </button>
          </div>
        </form>
      )}

      <div className="p-0">
        {quickActions.length === 0 ? (
          <div className="p-xl text-center text-outline">No quick actions found. Add one above.</div>
        ) : (
          <ul className="divide-y divide-outline-variant/50">
            {quickActions.map(action => (
              <li key={action.documentId || action.id} className="p-lg flex justify-between items-center hover:bg-surface-container-lowest transition-colors">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <MdLink size={20} />
                  </div>
                  <div>
                    <h4 className="font-button-text text-on-surface">{action.title}</h4>
                    <a href={action.url} target="_blank" rel="noreferrer" className="text-label-md text-tertiary hover:underline">
                      {action.url}
                    </a>
                  </div>
                </div>
                <button 
                  onClick={() => removeQuickAction(action.documentId || action.id)}
                  className="p-sm text-error hover:bg-error-container rounded-lg transition-colors"
                  title="Delete"
                >
                  <MdDelete size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
