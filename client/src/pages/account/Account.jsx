<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
/>

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Account() {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f6f6f6]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-white border border-zinc-200 p-8 shadow-sm">
          <p className="text-sm text-zinc-500">Account</p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900">
            Profile Details
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Basic account information (safe to show).
          </p>

          {/* ✅ PROFILE AVATAR (BOOTSTRAP STYLE) */}
          <div className="mt-6 flex justify-center">
            <div className="position-relative">

              <img
                src={
                  profileImage ||
                  "https://ui-avatars.com/api/?name=User&background=ff7a00&color=fff"
                }
                alt="Profile"
                className="rounded-circle border"
                style={{
                  width: "110px",
                  height: "110px",
                  objectFit: "cover",
                }}
              />

              {/* Camera Icon */}
              <label
                className="position-absolute bottom-0 end-0 bg-warning rounded-circle p-2 shadow"
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-camera-fill text-black">+</i>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleProfileImage}
                />
              </label>
            </div>
          </div>

          {/* DETAILS GRID (UNCHANGED) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-5">
              <p className="text-xs text-zinc-500">Name</p>
              <p className="mt-2 text-lg font-bold text-zinc-900">
                {user?.name}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-5">
              <p className="text-xs text-zinc-500">Email</p>
              <p className="mt-2 text-lg font-bold text-zinc-900">
                {user?.email}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-5">
              <p className="text-xs text-zinc-500">Role</p>
              <p className="mt-2 text-lg font-bold text-zinc-900">
                Citizen
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-5">
              <p className="text-xs text-zinc-500">Provider</p>
              <p className="mt-2 text-lg font-bold text-zinc-900">
                {user?.provider}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
