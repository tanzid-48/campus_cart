"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { updateProfile } from "@/lib/api/profile";
import { toast } from "sonner";
import { User, Phone, GraduationCap, Save } from "lucide-react";

interface ProfileEditFormProps {
  initialName: string;
  initialPhone: string;
  initialUniversity: string;
}

export default function ProfileEditForm({
  initialName,
  initialPhone,
  initialUniversity,
}: ProfileEditFormProps) {
  const [name, setName] = useState<string>(initialName);
  const [phone, setPhone] = useState<string>(initialPhone);
  const [university, setUniversity] = useState<string>(initialUniversity);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const result = await updateProfile({ name, phone, university });

    setIsSaving(false);

    if (result.success) {
      toast.success("Profile updated successfully");
      // Refresh BetterAuth's cached session so Navbar/other components see the new data
      await authClient.getSession({ query: { disableCookieCache: true } });
    } else {
      toast.error(result.message || "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
          <User size={15} />
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Phone size={15} />
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
          placeholder="+8801XXXXXXXXX"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Shown to buyers so they can contact you via WhatsApp or call.
        </p>
      </div>

      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
          <GraduationCap size={15} />
          University
        </label>
        <input
          type="text"
          value={university}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUniversity(e.target.value)
          }
          placeholder="Pundra University of Science & Technology"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-800 disabled:opacity-60"
      >
        <Save size={16} />
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
