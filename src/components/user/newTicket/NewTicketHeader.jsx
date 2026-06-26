// ============================================================
// NewTicketHeader.jsx
// Page header: title + subtitle for the new ticket form.
// ============================================================

export default function NewTicketHeader() {
  return (
    <div>
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
        Submit a Request
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
        Provide details about your issue so we can help you as quickly as
        possible.
      </p>
    </div>
  );
}
