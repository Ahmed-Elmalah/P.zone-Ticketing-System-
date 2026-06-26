import React from "react";
import { MdComputer, MdRouter, MdVpnKey } from "react-icons/md";
import TicketQueueTabs from "./TicketQueueTabs";
import TicketQueueToolbar from "./TicketQueueToolbar";
import TicketQueueRow from "./TicketQueueRow";

// Dummy data array for tickets
const queueData = [
  {
    id: "#IT-402",
    subject: "Laptop won't boot",
    desc: "User reports Lenovo T14 shows black screen with blinking cursor on startup. Attempted hard reset.",
    category: "Hardware",
    Icon: MdComputer,
    priority: "High",
    dotColor: "bg-error",
    time: "45m",
  },
  {
    id: "#IT-405",
    subject: "Cannot access VPN",
    desc: "Getting error code 809 when trying to connect to the corporate VPN from home network.",
    category: "Network",
    Icon: MdRouter,
    priority: "High",
    dotColor: "bg-error",
    time: "1h 12m",
  },
  {
    id: "#IT-411",
    subject: "Password reset required for Jira",
    desc: "Account locked after too many failed attempts. Need to regain access ASAP for sprint planning.",
    category: "Access",
    Icon: MdVpnKey,
    priority: "Medium",
    dotColor: "bg-tertiary",
    time: "2h 30m",
  },
  {
    id: "#IT-418",
    subject: "Requesting new monitor",
    desc: "Current monitor has dead pixels in the center. Requesting a replacement 27-inch display.",
    category: "Hardware",
    Icon: MdComputer,
    priority: "Low",
    dotColor: "bg-outline",
    time: "1d 4h",
  },
];

export default function TicketQueue() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high overflow-hidden">
      <TicketQueueTabs />
      <TicketQueueToolbar />

      {/* ── Ticket Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high bg-surface-bright">
              <th className="py-sm px-lg font-label-md text-label-md text-on-surface-variant w-24">
                Ticket ID
              </th>
              <th className="py-sm px-lg font-label-md text-label-md text-on-surface-variant">
                Subject
              </th>
              <th className="py-sm px-lg font-label-md text-label-md text-on-surface-variant w-32">
                Category
              </th>
              <th className="py-sm px-lg font-label-md text-label-md text-on-surface-variant w-32">
                Priority
              </th>
              <th className="py-sm px-lg font-label-md text-label-md text-on-surface-variant w-32 text-right">
                Time in Queue
              </th>
              <th className="py-sm px-lg w-12"></th>
            </tr>
          </thead>
          <tbody className="font-body-md text-body-md">
            {queueData.map((ticket, index) => (
              <TicketQueueRow key={index} ticket={ticket} />
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Footer ── */}
      <div className="p-md border-t border-surface-container-high flex justify-between items-center bg-surface-bright">
        <span className="font-body-md text-body-md text-on-surface-variant">
          Showing 1 to {queueData.length} of {queueData.length} tickets
        </span>
        <div className="flex gap-sm">
          <button className="px-3 py-1 border border-outline-variant rounded text-outline-variant cursor-not-allowed font-button-text text-button-text">
            Previous
          </button>
          <button className="px-3 py-1 border border-outline-variant rounded text-on-surface hover:bg-surface-container-high transition-colors font-button-text text-button-text">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
