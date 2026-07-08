import React, { useState, useEffect, useRef } from "react";
import {
  MdAttachment,
  MdAssignmentTurnedIn,
  MdPersonSearch,
  MdClose,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useHelpStore from "../../../store/useHelpStore";
import { useAuthStore } from "../../../auth/authStore";
import { helpDeskRepo } from "../../../api/helpDeskRepo";
import { messageRepo } from "../../../api/messageRepo";
import axiosInstance from "../../../api/axiosConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchableSelect from "../../shared/SearchableSelect";

export default function HelpNewTicketForm() {
  const navigate = useNavigate();
  const { user: agent } = useAuthStore();
  const { usersList, loadUsersList } = useHelpStore();
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadUsersList();
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data?.data || res.data || []))
      .catch(console.error);
  }, [loadUsersList]);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    requesterId: "",
    subject: "",
    category: "",
    priority: "Medium",
    assignee: "unassigned",
    asset: "",
    description: "",
    internalNote: "",
  });
  const [files, setFiles] = useState([]);

  // Filter agents for assignee dropdown
  const agentsOnly = usersList.filter(
    (u) =>
      u.role?.type === "help" ||
      u.role?.type === "admin" ||
      u.role?.name?.toLowerCase().includes("help"),
  );

  // Filter regular users for requester dropdown (exclude admin and help)
  const normalUsers = usersList.filter(
    (u) =>
      u.role?.type !== "help" &&
      u.role?.type !== "admin" &&
      !u.role?.name?.toLowerCase().includes("help"),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.requesterId || !formData.subject || !formData.description) {
      toast.error("Please fill in Requester, Subject, and Description");
      return;
    }

    setIsLoading(true);
    try {
      const parseId = (val) => {
        if (!val) return val;
        return /^\d+$/.test(String(val)) ? Number(val) : val;
      };

      let attachmentIds = [];
      if (files.length > 0) {
        const formDataUpload = new FormData();
        files.forEach((file) => formDataUpload.append("files", file));
        const uploadRes = await axiosInstance.post("/upload", formDataUpload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        attachmentIds = uploadRes.data.map((file) => file.id);
      }

      const ticketPayload = {
        subject: formData.subject,
        description: formData.description,
        category: formData.category ? parseId(formData.category) : null,
        priority: formData.priority,
        state: "Open",
        creator: parseId(formData.requesterId), // User who requested the ticket
        createdByAgent: agent?.documentId || parseId(agent?.id), // Agent who created it
        attachments: attachmentIds,
      };

      if (formData.assignee && formData.assignee !== "unassigned") {
        ticketPayload.assignee = parseId(formData.assignee);
      }

      const newTicketRes =
        await helpDeskRepo.createTicketOnBehalf(ticketPayload);
      const newTicketId =
        newTicketRes.data?.documentId || newTicketRes.documentId;

      // Add Internal Note if present
      if (formData.internalNote.trim() && newTicketId) {
        await messageRepo.sendMessage({
          content: formData.internalNote,
          ticket: newTicketId,
          sender: agent?.id,
          isInternalNote: true,
        });
      }

      toast.success("Ticket created on behalf successfully!");
      navigate("/help/tickets");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error?.message || "Failed to create ticket",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="p-xl space-y-xl" onSubmit={handleSubmit}>
      {/* ── Requester Search Section ── */}
      <div className="bg-primary/5 border border-primary/10 rounded-xl p-lg space-y-xs transition-colors hover:bg-primary/8">
        <label
          className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider flex items-center gap-2"
          htmlFor="requesterId"
        >
          <MdPersonSearch size={20} />
          Requester / Employee
        </label>
        <div className="relative">
          <SearchableSelect
            options={normalUsers.map((u) => ({
              value: u.documentId || u.id,
              label: `${u.employeeId ? `${u.employeeId} ` : ""}${u.username} (${u.email})`
            }))}
            value={formData.requesterId}
            onChange={(val) => handleChange({ target: { name: "requesterId", value: val } })}
            placeholder="Select User..."
            required={true}
            name="requesterId"
          />
        </div>
        <p className="text-[11px] text-on-surface-variant px-1 italic">
          Crucial: Ensure correct identity for historical SLA tracking. This
          sets the user as the owner.
        </p>
      </div>

      {/* ── 2-Column Grid for Ticket Meta Data ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
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
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

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
            value={formData.category}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.documentId || c.id}>
                {c.name || c.title}
              </option>
            ))}
          </select>
        </div>

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
            value={formData.priority}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div className="flex flex-col gap-xs">
          <label
            className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"
            htmlFor="assignee"
          >
            Assign To
          </label>
          <select
            className="w-full bg-surface-container-low rounded-lg border border-outline-variant px-md py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface font-body-md cursor-pointer"
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="unassigned">Unassigned (Queue)</option>
            {agentsOnly.map((a) => (
              <option key={a.id} value={a.documentId || a.id}>
                {a.username} ({a.role?.name})
              </option>
            ))}
          </select>
        </div>

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
            name="asset"
            value={formData.asset}
            onChange={handleChange}
            placeholder="e.g. LAP-0012, Monitor SN"
            disabled={isLoading}
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
          value={formData.description}
          onChange={handleChange}
          placeholder="Include steps to reproduce or specific error messages..."
          rows="4"
          required
          disabled={isLoading}
        ></textarea>
      </div>

      {/* ── File Upload Drop Zone ── */}
      <div className="flex flex-col gap-xs">
        <label className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">
          Attachments
        </label>

        <input
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isLoading}
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-outline-variant hover:border-primary/50 transition-colors rounded-xl p-lg flex flex-col items-center justify-center gap-2 bg-surface cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <MdAttachment size={20} />
          </div>
          <p className="font-body-md font-semibold text-on-surface">
            Upload log files or screenshots
          </p>
          <p className="text-xs text-on-surface-variant">
            Max size 10MB per file
          </p>
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <ul className="mt-sm space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-surface-container rounded-lg border border-outline-variant text-sm text-on-surface"
              >
                <span className="truncate max-w-[80%]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-error hover:bg-error/10 p-1 rounded transition-colors"
                  disabled={isLoading}
                >
                  <MdClose size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Internal Notes (Agent Only) ── */}
      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-center">
          <label
            className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"
            htmlFor="internalNote"
          >
            Internal Notes
          </label>
          <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded uppercase font-bold">
            Agents Only
          </span>
        </div>
        <textarea
          className="w-full bg-surface-container-lowest rounded-lg border border-outline-variant px-md py-2 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-on-surface font-body-md italic placeholder:text-on-surface-variant/40"
          id="internalNote"
          name="internalNote"
          value={formData.internalNote}
          onChange={handleChange}
          placeholder="Add private notes visible only to the IT team..."
          rows="2"
          disabled={isLoading}
        ></textarea>
      </div>

      {/* ── Form Actions Bar ── */}
      <div className="flex justify-end items-center gap-md pt-lg border-t border-outline-variant mt-lg">
        <button
          onClick={() => navigate(-1)}
          className="px-xl py-2.5 rounded-lg font-button-text text-button-text text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
          type="button"
          disabled={isLoading}
        >
          Discard Draft
        </button>
        <button
          disabled={isLoading}
          className="bg-primary text-on-primary px-xl py-2.5 rounded-lg font-button-text text-button-text hover:bg-surface-tint transition-all flex items-center gap-sm shadow-md cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={18} />
          ) : (
            <MdAssignmentTurnedIn size={18} />
          )}
          {isLoading ? "Creating..." : "Create Ticket on Behalf"}
        </button>
      </div>
    </form>
  );
}
