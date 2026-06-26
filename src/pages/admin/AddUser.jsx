// ============================================================
// AddUser.jsx  (Admin)
// Page that assembles the add new employee form in a card.
// ============================================================

import AddUserHeader from "../../components/admin/addUser/AddUserHeader";
import AddUserForm   from "../../components/admin/addUser/AddUserForm";

export default function AddUser() {
  return (
    <div className="flex justify-center items-start p-5">
      <div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl
        shadow-sm border border-outline-variant overflow-hidden">
        <AddUserHeader />
        <AddUserForm />
      </div>
    </div>
  );
}