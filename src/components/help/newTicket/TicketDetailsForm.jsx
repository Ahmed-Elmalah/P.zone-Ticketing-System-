import React from "react";
import { MdAttachment, MdAssignmentTurnedIn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function TicketDetailsForm() {
  const navigate = useNavigate();
  return (
    <form className="p-xl space-y-xl" onSubmit={(e) => e.preventDefault()}>
      {/* ── 2-Column Grid for Ticket Meta Data ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {/* Ticket Subject */}
        <div className="md:col-span-2 flex flex-col gap-xs">
          <label
            className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            className="w-full bg-surface-container-low rounded-lg border border-outline-variant px-md py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface font-body-md"
            id="subject"
            name="subject"
            placeholder="Summary of the technical issue"
            type="text"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-xs">
          <label
            className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="w-full bg-surface-container-low rounded-lg border border-outline-variant px-md py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface font-body-md"
            id="category"
            name="category"
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            <option>Hardware Repair</option>
            <option>Software Installation</option>
            <option>Network Connectivity</option>
            <option>Access Management</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-xs">
          <label
            className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"
            htmlFor="priority"
          >
            Priority
          </label>
          <select
            className="w-full bg-surface-container-low rounded-lg border border-outline-variant px-md py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface font-body-md"
            id="priority"
            name="priority"
            defaultValue="medium"
          >
            <option value="low">Low - General Inquiry</option>
            <option value="medium">Medium - Default</option>
            <option value="high">High - Impacting Work</option>
            <option value="critical">Critical - System Down</option>
          </select>
        </div>

        {/* Assignee */}
        <div className="flex flex-col gap-xs">
          <label
            className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"
            htmlFor="assignee"
          >
            Assign To
          </label>
          <select
            className="w-full bg-surface-container-low rounded-lg border border-outline-variant px-md py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface font-body-md"
            id="assignee"
            defaultValue="me"
          >
            <option value="unassigned">Unassigned (Queue)</option>
            <option value="me">Me (Assign to self)</option>
            <option value="level2">Level 2 Support</option>
            <option value="security">Security Team</option>
          </select>
        </div>

        {/* Assets/Hardware */}
        <div className="flex flex-col gap-xs">
          <label
            className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"
            htmlFor="asset"
          >
            Affected Asset
          </label>
          <input
            className="w-full bg-surface-container-low rounded-lg border border-outline-variant px-md py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface font-body-md"
            id="asset"
            placeholder="e.g. LAP-0012, Monitor SN"
            type="text"
          />
        </div>
      </div>

      {/* ── Description field ── */}
      <div className="flex flex-col gap-xs">
        <label
          className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"
          htmlFor="description"
        >
          Detailed Description
        </label>
        <textarea
          className="w-full bg-surface-container-low rounded-lg border border-outline-variant px-md py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface font-body-md resize-none"
          id="description"
          name="description"
          placeholder="Include steps to reproduce or specific error messages..."
          rows="4"
        ></textarea>
      </div>

      {/* ── File Upload Drop Zone ── */}
      <div className="flex flex-col gap-xs">
        <label className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">
          Attachments
        </label>
        <div className="border-2 border-dashed border-outline-variant hover:border-primary/50 transition-colors rounded-xl p-lg flex flex-col items-center justify-center gap-2 bg-surface cursor-pointer group">
          <div className="h-10 w-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <MdAttachment size={20} />
          </div>
          <p className="font-body-md font-semibold text-on-surface">
            Upload log files or screenshots
          </p>
          <p className="text-xs text-on-surface-variant">
            Max size 20MB per file
          </p>
        </div>
      </div>

      {/* ── Internal Notes (Agent Only) ── */}
      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-center">
          <label
            className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"
            htmlFor="internal-note"
          >
            Internal Notes
          </label>
          <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded uppercase font-bold">
            Agents Only
          </span>
        </div>
        <textarea
          className="w-full bg-surface-container-lowest rounded-lg border border-outline-variant px-md py-2 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-on-surface font-body-md italic placeholder:text-on-surface-variant/40"
          id="internal-note"
          placeholder="Add private notes visible only to the IT team..."
          rows="2"
        ></textarea>
      </div>

      {/* ── Form Actions Bar ── */}
      <div className="flex justify-end items-center gap-md pt-lg border-t border-outline-variant mt-lg">
        <button
          onClick={() => navigate(-1)}
          className="px-xl py-2.5 rounded-lg font-button-text text-button-text text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95"
          type="button"
        >
          Discard Draft
        </button>
        <button
          className="bg-primary text-on-primary px-xl py-2.5 rounded-lg font-button-text text-button-text hover:bg-surface-tint transition-all flex items-center gap-sm shadow-md cursor-pointer active:scale-95"
          type="submit"
        >
          <MdAssignmentTurnedIn size={18} />
          Create Ticket
        </button>
      </div>
    </form>
  );
}
