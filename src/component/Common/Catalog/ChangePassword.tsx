// ChangePasswordModal.tsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordData {
  current: string;
  newPass: string;
}

interface ChangePasswordModalProps {
  show: boolean;
  onClose: () => void;
  passwords: PasswordData;
  setPasswords: (passwords: PasswordData) => void;
  handleChangePassword: () => void;
  loadingChangePass: boolean;
}

export default function ChangePasswordModal({
  show,
  onClose,
  passwords,
  setPasswords,
  handleChangePassword,
  loadingChangePass,
}: ChangePasswordModalProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-6 rounded max-w-md w-full relative">
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>&times;</button>
        <h2 className="text-white text-xl mb-4">Change Password</h2>
        <div className="relative mb-3">
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="bg-gray-800 p-2 rounded w-full pr-10"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label={showCurrent ? "Hide current password" : "Show current password"}
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            value={passwords.newPass}
            onChange={(e) =>
              setPasswords({ ...passwords, newPass: e.target.value })
            }
            className="bg-gray-800 p-2 rounded w-full pr-10"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label={showNew ? "Hide new password" : "Show new password"}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleChangePassword}
            disabled={loadingChangePass}
            className="bg-cyan-600 px-4 py-2 rounded"
          >
            {loadingChangePass ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
