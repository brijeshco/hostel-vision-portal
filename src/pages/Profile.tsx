import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../lib/localStorage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface Profile {
  name: string;
  email: string;
  role: string;
}

const STORAGE_KEY = "profile";

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({ name: "", email: "", role: "" });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Profile>(profile);

  useEffect(() => {
    const data = getItem<Profile>(STORAGE_KEY) || { name: "Admin", email: "admin@hostel.com", role: "admin" };
    setProfile(data);
    setForm(data);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setItem(STORAGE_KEY, form);
    setEdit(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {edit ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <Input name="role" value={form.role} onChange={handleChange} placeholder="Role" required />
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="secondary" onClick={() => { setEdit(false); setForm(profile); }}>Cancel</Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-2">
          <div><b>Name:</b> {profile.name}</div>
          <div><b>Email:</b> {profile.email}</div>
          <div><b>Role:</b> {profile.role}</div>
          <Button onClick={() => setEdit(true)}>Edit</Button>
        </div>
      )}
    </div>
  );
}