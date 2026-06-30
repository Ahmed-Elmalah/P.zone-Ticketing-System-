import React, { useState } from "react";
import CategoryItem from "./CategoryItem";
import { MdAdd, MdCategory } from "react-icons/md";
import useAdminStore from "../../../store/useAdminStore";

export default function ITCategoriesSettings() {
  const { categories, addCategory, isLoadingCategories } = useAdminStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState("");

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
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 max-w-4xl">
      <div className="p-lg border-b border-outline-variant/20 bg-surface-bright rounded-t-xl">
        <h3 className="font-headline-md text-on-surface">Manage IT Categories</h3>
        <p className="font-body-md text-on-surface-variant mt-1">
          Organize and structure support request categories.
        </p>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="p-lg border-b border-outline-variant/20 bg-surface-container-low flex flex-col sm:flex-row gap-md items-end">
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

      <div>
        {categories.length === 0 ? (
          <div className="p-xl text-center text-outline">No categories found.</div>
        ) : (
          categories.map(cat => (
            <CategoryItem
              key={cat.documentId || cat.id}
              icon={<MdCategory size={20} />}
              name={cat.name}
              ticketCount="-"
              iconColor="text-primary bg-primary-container/10"
            />
          ))
        )}
      </div>

      {!isAdding && (
        <div className="p-lg bg-surface-bright rounded-b-xl border-t border-outline-variant/20 flex justify-center">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-sm text-primary bg-primary-container/10 px-lg py-sm rounded-full font-button-text hover:bg-primary-container/20 transition-colors"
          >
            <MdAdd size={18} /> Create New Category
          </button>
        </div>
      )}
    </div>
  );
}
