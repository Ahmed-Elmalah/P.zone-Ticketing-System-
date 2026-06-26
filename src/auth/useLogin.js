// ============================================================
// useLogin.js
// Custom hook that handles all auth logic:
// login, logout, token check, signup, password change,
// and creating staff accounts.
//
// Generic: no hardcoded roles — reads from roleConfig.js
// ============================================================

import { useNavigate, useLocation } from "react-router-dom";
import LoginRepo from "./LoginRepo";
import { useAuthStore } from "./authStore";
import { getRedirectByRole, defaultRedirect } from "./roleConfig";

export default function useLogin() {
  const { syncUser, clearUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Remember where the user was trying to go before being redirected to login
  const from = location.state?.from?.pathname;

  // ----------------------------------------------------------
  // login
  // Sends credentials to Strapi, saves JWT, then checks token.
  // rememberMe = true  → localStorage  (survives browser close)
  // rememberMe = false → sessionStorage (cleared when tab closes)
  // ----------------------------------------------------------
  const login = async (values, rememberMe = false) => {
    try {
      const res = await LoginRepo.auth_login(values);
      const jwt = res.data.jwt;

      // Save token based on rememberMe choice
      if (rememberMe) {
        localStorage.setItem("jwt-token", jwt);
      } else {
        sessionStorage.setItem("jwt-token", jwt);
      }

      // Validate token and redirect — pass rememberMe so user-info
      // gets saved to the same storage as the token
      await checkToken(jwt, rememberMe);

      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // ----------------------------------------------------------
  // checkToken
  // Validates the JWT with Strapi, saves user info, redirects.
  // Called after login or on app startup to restore session.
  //
  // rememberMe = true  → saves user-info to localStorage
  // rememberMe = false → checks where the token already lives
  //                      and saves user-info to the same place
  // ----------------------------------------------------------
  const checkToken = async (jwtFromParam = null, rememberMe = false) => {
    const jwtInLocal = localStorage.getItem("jwt-token");
    const jwtInSession = sessionStorage.getItem("jwt-token");
    const jwt = jwtFromParam || jwtInLocal || jwtInSession;

    if (!jwt) return;

    try {
      const res = await LoginRepo.check_token(jwt);
      const userInfo = res.data;

      // Save user-info to the same storage as the JWT
      // so both are always in sync
      const persistLocally = rememberMe || !!jwtInLocal;
      if (persistLocally) {
        localStorage.setItem("user-info", JSON.stringify(userInfo));
      } else {
        sessionStorage.setItem("user-info", JSON.stringify(userInfo));
      }

      // Sync Zustand store with the new user data
      syncUser();

      // Get redirect path from roleConfig (no hardcoded roles here)
      const roleName = userInfo?.role?.name || "";
      const redirectPath = getRedirectByRole(roleName);

      // If the user was trying to access a specific page before login, go there
      if (from && from !== "/login" && from !== redirectPath) {
        navigate(from, { replace: true });
      } else {
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      // Token is invalid or expired — log the user out
      console.error("Token check failed:", err);
      logOut();
    }
  };

  // ----------------------------------------------------------
  // logOut
  // Clears all storage and redirects to login page
  // ----------------------------------------------------------
  const logOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    clearUser();
    navigate(defaultRedirect, { replace: true });
  };

  // ----------------------------------------------------------
  // signup
  // Registers a new user, then updates extra profile fields
  // ----------------------------------------------------------
  const signup = async (values) => {
    try {
      const res = await LoginRepo.auth_signup(values);
      const { jwt, user } = res.data;

      // Save any extra fields not part of the default signup
      // (e.g. phone, branch, etc.)
      const extraData = values.extraFields || {};

      if (Object.keys(extraData).length > 0) {
        try {
          await LoginRepo.update_user(user.id, extraData, jwt);
        } catch (updateErr) {
          console.error("Failed to update extra profile fields:", updateErr);
        }
      }

      sessionStorage.setItem("jwt-token", jwt);
      await checkToken(jwt);

      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // ----------------------------------------------------------
  // updateProfile
  // Update any field for the logged-in user
  // ----------------------------------------------------------
  const updateProfile = async (id, data) => {
    const jwt = sessionStorage.getItem("jwt-token");

    try {
      await LoginRepo.update_user(id, data, jwt);

      // Re-check token to refresh stored user info after update
      await checkToken(jwt);

      return { success: true };
    } catch (err) {
      console.error("Profile update failed:", err);
      return { success: false, error: err.message };
    }
  };

  // ----------------------------------------------------------
  // updatePassword
  // Change the current user's password
  // ----------------------------------------------------------
  const updatePassword = async (
    currentPassword,
    newPassword,
    confirmPassword,
  ) => {
    const jwt = sessionStorage.getItem("jwt-token");

    try {
      await LoginRepo.change_password(
        {
          currentPassword,
          password: newPassword,
          passwordConfirmation: confirmPassword,
        },
        jwt,
      );

      return { success: true };
    } catch (err) {
      console.error("Password update failed:", err);
      return {
        success: false,
        error: err.response?.data?.error?.message || "Password update failed",
      };
    }
  };

  // ----------------------------------------------------------
  // createStaffAccount
  // Admin creates a new user account and assigns role + extra data
  // Usage: createStaffAccount(values, { branch: 1, phone: "..." }, roleId)
  // ----------------------------------------------------------
  const createStaffAccount = async (values, extraData = {}, roleId = null) => {
    const adminToken = sessionStorage.getItem("jwt-token");

    try {
      // Step 1: Register the new user
      const res = await LoginRepo.auth_signup(values);
      const newUser = res.data.user;
      const newUserToken = res.data.jwt;

      // Step 2: Update extra profile fields using new user's own token
      if (Object.keys(extraData).length > 0) {
        try {
          await LoginRepo.update_user(newUser.id, extraData, newUserToken);
        } catch (updateErr) {
          console.error("Failed to update staff extra data:", updateErr);
        }
      }

      // Step 3: Assign role using admin token (users can't change their own role)
      if (roleId) {
        try {
          await LoginRepo.update_user(newUser.id, { role: roleId }, adminToken);
        } catch (roleErr) {
          console.error("Failed to assign role to new staff:", roleErr);
          throw new Error("User created but role assignment failed");
        }
      }

      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    login,
    checkToken,
    logOut,
    signup,
    updateProfile,
    updatePassword,
    createStaffAccount,
  };
}
