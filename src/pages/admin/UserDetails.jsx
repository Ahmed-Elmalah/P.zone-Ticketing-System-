// ============================================================
// UserDetails.jsx  (Admin)
// Shows a single user's details.
// - View mode: read-only, Edit + Delete buttons in header
// - Edit mode: form is editable, Save + Cancel in header
//
// Gets user :id from URL params → fetches from Strapi.
// ============================================================

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserDetailsHeader from "../../components/admin/userDetails/UserDetailsHeader";
import UserDetailsForm from "../../components/admin/userDetails/UserDetailsForm";

// ── Mock user (replace with useFetch / Strapi API) ──────────
const MOCK_USER = {
  id: 1,
  username: "Jane Doe",
  email: "jane.doe@company.com",
  department: "it",
  jobTitle: "Support Technician",
  blocked: false,
  role: { name: "help" },
};

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // TODO: replace with real fetch
  // const { data: user, loading } = useFetch(`/api/users/${id}?populate=role`);
  const user = MOCK_USER;

  // ── Handlers ────────────────────────────────────────────────
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  // Called by UserDetailsForm after successful save
  const handleSaveDone = () => setIsEditing(false);

  const handleDelete = async () => {
    // Simple browser confirm — replace with a modal component later
    const confirmed = window.confirm(
      `Are you sure you want to delete "${user.username}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      // TODO: await LoginRepo.deleteUser(id, jwt)
      toast.success("User deleted.");
      navigate("/admin/users");
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  return ( 
    <div className="flex justify-center items-start p-5">
      <div
        className="w-full max-w-4xl bg-surface-container-lowest rounded-xl
        shadow-sm border border-outline-variant overflow-hidden"
      >
        {/* Header — avatar, name, Edit/Save/Delete buttons */}
        <UserDetailsHeader
          user={user}
          isEditing={isEditing}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />

        {/* Pre-filled form — disabled in view mode, editable in edit mode */}
        <UserDetailsForm
          user={user}
          isEditing={isEditing}
          onSubmitDone={handleSaveDone}
        />
      </div>
    </div>
  );
}
