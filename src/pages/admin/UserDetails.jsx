// ============================================================
// UserDetails.jsx  (Admin)
// Shows a single user's details.
// - View mode: read-only, Edit + Delete buttons in header
// - Edit mode: form is editable, Save + Cancel in header
//
// Gets user :id from URL params → fetches from Strapi.
// ============================================================

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserDetailsHeader from "../../components/admin/userDetails/UserDetailsHeader";
import UserDetailsForm from "../../components/admin/userDetails/UserDetailsForm";
import { userRepo } from "../../api/userRepo";
import axiosInstance from "../../api/axiosConfig";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await userRepo.getUserById(id);
      setUser(data);
    } catch (error) {
      toast.error("Failed to load user details");
      navigate("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  // ── Handlers ────────────────────────────────────────────────
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    fetchUser(); // reset form state by refetching user
  };

  // Called by UserDetailsForm after successful save
  const handleSaveDone = () => {
    setIsEditing(false);
    fetchUser(); // reload the newly updated data
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${user.username}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/users/${id}`);
      toast.success("User deleted.");
      navigate("/admin/users");
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  if (loading) {
    return <div className="p-xl text-center">Loading...</div>;
  }

  if (!user) return null;

  return ( 
    <div className="flex flex-col justify-start items-center p-5 gap-md w-full">
      
      {/* ── Back Button ── */}
      <div className="w-full max-w-4xl flex justify-start">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-button-text"
        >
          <span className="text-xl leading-none">&larr;</span> Back to Users
        </button>
      </div>

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
