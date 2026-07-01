import React, { useState } from "react";
import { createPortal } from "react-dom";
import CategoryItem from "./CategoryItem";
import { MdAdd, MdCategory } from "react-icons/md";
import useAdminStore from "../../../store/useAdminStore";

export default function ITCategoriesSettings() {
  const { categories, addCategory, isLoadingCategories } = useAdminStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCatName, setEditCatName] = useState("");

  const handleEditSave = async () => {
    if (!editCatName.trim() || !editingCategory) return;
    try {
      await useAdminStore.getState().updateCategory(editingCategory.id, { name: editCatName.trim() });
      setEditingCategory(null);
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      await addCategory({ name: newCatName });
      setNewCatName("");
      setIsAdding(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoadingCategories) {
    return <div className="animate-pulse bg-surface-container h-64 rounded-xl"></div>;
  }

  return (
    <>
      <div className="bg-surface rounded-xl shadow-sm border border-outline-variant max-w-4xl overflow-hidden">
        <div className="p-lg border-b border-outline-variant bg-surface-container-low">
          <h3 className="font-headline-md text-on-surface">Manage IT Categories</h3>
          <p className="font-body-md text-on-surface-variant mt-1">
            Organize and structure support request categories.
          </p>
        </div>

        {isAdding && (
          <form onSubmit={handleAdd} className="p-lg border-b border-outline-variant bg-surface-container-low flex flex-col sm:flex-row gap-md items-end">
            <div className="flex-1 w-full">
              <label className="font-label-md text-outline mb-xs block">Category Name</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full p-sm bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-primary outline-none"
                placeholder="e.g., Hardware"
              />
            </div>
            <div className="flex gap-sm w-full sm:w-auto">
              <button type="button" onClick={() => setIsAdding(false)} className="px-md py-sm text-on-surface-variant hover:bg-surface-container rounded-lg font-button-text">
                Cancel
              </button>
              <button type="submit" className="px-md py-sm bg-primary text-on-primary rounded-lg font-button-text">
                Save
              </button>
            </div>
          </form>
        )}

        <div className="divide-y divide-outline-variant/50">
          {categories.length === 0 ? (
            <div className="p-xl text-center text-outline">No categories found.</div>
          ) : (
            categories.map(cat => {
              const catId = cat.documentId || cat.id;
              return (
                <CategoryItem
                  key={catId}
                  icon={<MdCategory size={20} />}
                  name={cat.name}
                  ticketCount="-"
                  iconColor="text-primary bg-primary-container/10"
                  onEdit={() => {
                    setEditingCategory({ id: catId, name: cat.name });
                    setEditCatName(cat.name);
                  }}
                  onDelete={async () => {
                    if (window.confirm(`Are you sure you want to delete "${cat.name}"?`)) {
                      try {
                        await useAdminStore.getState().removeCategory(catId);
                      } catch (error) {
                        console.error("Failed to delete category", error);
                      }
                    }
                  }}
                />
              );
            })
          )}
        </div>

        {!isAdding && (
          <div className="p-lg bg-surface-container-low border-t border-outline-variant flex justify-center">
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-sm text-primary bg-primary-container/10 px-lg py-sm rounded-full font-button-text hover:bg-primary-container/20 transition-colors"
            >
              <MdAdd size={18} /> Create New Category
            </button>
          </div>
        )}
      </div>

      {/* ── Edit Modal via Portal ── */}
      {editingCategory && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setEditingCategory(null); }}
        >
          <div style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-on-surface)',
            width: '100%',
            maxWidth: '460px',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--color-outline-variant)',
          }}>
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--color-outline-variant)',
              backgroundColor: 'var(--color-surface-container-low)',
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: 'var(--color-on-surface)' }}>Edit Category</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Update the category name below</p>
            </div>

            {/* Body */}
            <div style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface-variant)', marginBottom: '8px' }}>
                Category Name
              </label>
              <input
                type="text"
                autoFocus
                value={editCatName}
                onChange={(e) => setEditCatName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditSave();
                  if (e.key === 'Escape') setEditingCategory(null);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '15px',
                  border: '1.5px solid var(--color-outline-variant)',
                  borderRadius: '8px',
                  outline: 'none',
                  color: 'var(--color-on-surface)',
                  backgroundColor: 'var(--color-surface-container)',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-outline-variant)')}
              />
            </div>

            {/* Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--color-outline-variant)',
              backgroundColor: 'var(--color-surface-container-low)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
            }}>
              <button
                onClick={() => setEditingCategory(null)}
                style={{
                  padding: '9px 20px',
                  border: '1px solid var(--color-outline-variant)',
                  borderRadius: '8px',
                  background: 'transparent',
                  color: 'var(--color-on-surface-variant)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={!editCatName.trim()}
                style={{
                  padding: '9px 20px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: editCatName.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  opacity: editCatName.trim() ? 1 : 0.5,
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
