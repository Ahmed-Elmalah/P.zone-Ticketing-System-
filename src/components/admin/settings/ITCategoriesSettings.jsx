import React from "react";
import CategoryItem from "./CategoryItem";
import {
  MdDevices,
  MdAppShortcut,
  MdRouter,
  MdKey,
  MdAdd,
} from "react-icons/md";

export default function ITCategoriesSettings() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 max-w-4xl">
      {/* Card Header */}
      <div className="p-lg border-b border-outline-variant/20 bg-surface-bright rounded-t-xl">
        <h3 className="font-headline-md text-on-surface">
          Manage IT Categories
        </h3>
        <p className="font-body-md text-on-surface-variant mt-1">
          Organize and structure support request categories.
        </p>
      </div>

      {/* List Container */}
      <div>
        <CategoryItem
          icon={<MdDevices size={20} />}
          name="Hardware"
          ticketCount="312"
          iconColor="text-primary bg-primary-container/10"
        />
        <CategoryItem
          icon={<MdAppShortcut size={20} />}
          name="Software"
          ticketCount="548"
          iconColor="text-secondary bg-secondary-container/20"
        />
        <CategoryItem
          icon={<MdRouter size={20} />}
          name="Network"
          ticketCount="189"
          iconColor="text-tertiary bg-tertiary-container/10"
        />
        <CategoryItem
          icon={<MdKey size={20} />}
          name="Access Management"
          ticketCount="420"
          iconColor="text-on-primary-fixed bg-primary-fixed"
        />
      </div>

      {/* Footer Action */}
      <div className="p-lg bg-surface-bright rounded-b-xl border-t border-outline-variant/20 flex justify-center">
        <button className="flex items-center gap-sm text-primary bg-primary-container/10 px-lg py-sm rounded-full font-button-text">
          <MdAdd size={18} /> Create New Category
        </button>
      </div>
    </div>
  );
}
