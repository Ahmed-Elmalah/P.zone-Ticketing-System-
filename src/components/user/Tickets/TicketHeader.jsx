import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

// Component for the page title and primary action button
const TicketHeader = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
      <div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          All Tickets
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
          Manage and track all customer support requests.
        </p>
      </div>
      <Link to={'new'} className="bg-primary-container text-on-primary font-button-text text-button-text px-lg py-sm rounded-lg shadow-lg hover:bg-surface-tint transition-all flex items-center gap-sm">
        <IoMdAdd className="text-[20px]" />
        New Ticket
      </Link>
    </section>
  );
};

export default TicketHeader;
