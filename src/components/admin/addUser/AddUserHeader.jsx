// ============================================================
// AddUserHeader.jsx
// Title and subtitle at the top of the add user form card.
// ============================================================

export default function AddUserHeader() {
  return (
    <div className="p-lg border-b border-outline-variant bg-surface">
      <h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">
        Add New Employee
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant">
        Create a new account to grant access to the system.
      </p>
    </div>
  );
}