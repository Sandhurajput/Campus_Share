import React, { useState } from "react";
import { Edit2, X, Check } from "lucide-react";

const EditProfileModal = ({ user, setUser, closeModal }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    profileImage: user.profileImage,
  });

  const handleSave = () => {
    if (!formData.name.trim()) return;

    const updatedUser = {
      ...user,
      name: formData.name,
      profileImage: formData.profileImage,
      initials: formData.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    };

    setUser(updatedUser);
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Edit2 className="w-5 h-5 mr-2 text-indigo-600" /> Quick Edit
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL
            </label>
            <input
              type="url"
              value={formData.profileImage}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profileImage: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formData.profileImage && (
              <div className="mt-2 text-center">
                <img
                  src={formData.profileImage}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-indigo-300"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <button
            onClick={handleSave}
            className="px-5 py-2 flex items-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            disabled={!formData.name.trim()}
          >
            <Check className="w-4 h-4 mr-1" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
