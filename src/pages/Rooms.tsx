import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../lib/localStorage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table } from "../components/ui/table";

interface Room {
  id: string;
  number: string;
  type: string;
  capacity: number;
}

const STORAGE_KEY = "rooms";

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [form, setForm] = useState<Partial<Room>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const data = getItem<Room[]>(STORAGE_KEY) || [];
    setRooms(data);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.number || !form.type || !form.capacity) return;
    if (editingId) {
      // Edit
      const updated = rooms.map((r) =>
        r.id === editingId ? { ...r, ...form, id: editingId, capacity: Number(form.capacity) } : r
      );
      setRooms(updated);
      setItem(STORAGE_KEY, updated);
      setEditingId(null);
    } else {
      // Add
      const newRoom: Room = {
        id: Date.now().toString(),
        number: form.number!,
        type: form.type!,
        capacity: Number(form.capacity),
      };
      const updated = [...rooms, newRoom];
      setRooms(updated);
      setItem(STORAGE_KEY, updated);
    }
    setForm({});
  };

  const handleEdit = (id: string) => {
    const room = rooms.find((r) => r.id === id);
    if (room) {
      setForm(room);
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
    const updated = rooms.filter((r) => r.id !== id);
    setRooms(updated);
    setItem(STORAGE_KEY, updated);
    if (editingId === id) {
      setEditingId(null);
      setForm({});
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Rooms</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <Input
          name="number"
          placeholder="Room Number"
          value={form.number || ""}
          onChange={handleChange}
          required
        />
        <Input
          name="type"
          placeholder="Type (e.g. Single, Double)"
          value={form.type || ""}
          onChange={handleChange}
          required
        />
        <Input
          name="capacity"
          placeholder="Capacity"
          type="number"
          value={form.capacity || ""}
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
            <th>Number</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.number}</td>
              <td>{room.type}</td>
              <td>{room.capacity}</td>
              <td>
                <Button size="sm" onClick={() => handleEdit(room.id)}>
                  Edit
                </Button>{" "}
                <Button size="sm" variant="destructive" onClick={() => handleDelete(room.id)}>
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