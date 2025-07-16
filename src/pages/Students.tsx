import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../lib/localStorage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table } from "../components/ui/table";

interface Student {
  id: string;
  name: string;
  email: string;
  room: string;
}

const STORAGE_KEY = "students";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<Partial<Student>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const data = getItem<Student[]>(STORAGE_KEY) || [];
    setStudents(data);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.room) return;
    if (editingId) {
      // Edit
      const updated = students.map((s) =>
        s.id === editingId ? { ...s, ...form, id: editingId } : s
      );
      setStudents(updated);
      setItem(STORAGE_KEY, updated);
      setEditingId(null);
    } else {
      // Add
      const newStudent: Student = {
        id: Date.now().toString(),
        name: form.name!,
        email: form.email!,
        room: form.room!,
      };
      const updated = [...students, newStudent];
      setStudents(updated);
      setItem(STORAGE_KEY, updated);
    }
    setForm({});
  };

  const handleEdit = (id: string) => {
    const student = students.find((s) => s.id === id);
    if (student) {
      setForm(student);
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    setItem(STORAGE_KEY, updated);
    if (editingId === id) {
      setEditingId(null);
      setForm({});
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Students</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <Input
          name="name"
          placeholder="Name"
          value={form.name || ""}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          placeholder="Email"
          value={form.email || ""}
          onChange={handleChange}
          required
        />
        <Input
          name="room"
          placeholder="Room"
          value={form.room || ""}
          onChange={handleChange}
          required
        />
        <Button type="submit">{editingId ? "Update" : "Add"}</Button>
        {editingId && (
          <Button type="button" variant="secondary" onClick={() => { setEditingId(null); setForm({}); }}>
            Cancel
          </Button>
        )}
      </form>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.room}</td>
              <td>
                <Button size="sm" onClick={() => handleEdit(student.id)}>
                  Edit
                </Button>{" "}
                <Button size="sm" variant="destructive" onClick={() => handleDelete(student.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}