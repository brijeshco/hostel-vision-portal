import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../lib/localStorage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table } from "../components/ui/table";

interface Booking {
  id: string;
  studentId: string;
  roomId: string;
  from: string;
  to: string;
}

interface Student {
  id: string;
  name: string;
}

interface Room {
  id: string;
  number: string;
}

const STORAGE_KEY = "bookings";

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form, setForm] = useState<Partial<Booking>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    setBookings(getItem<Booking[]>(STORAGE_KEY) || []);
    setStudents(getItem<Student[]>("students") || []);
    setRooms(getItem<Room[]>("rooms") || []);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentId || !form.roomId || !form.from || !form.to) return;
    if (editingId) {
      // Edit
      const updated = bookings.map((b) =>
        b.id === editingId ? { ...b, ...form, id: editingId } : b
      );
      setBookings(updated);
      setItem(STORAGE_KEY, updated);
      setEditingId(null);
    } else {
      // Add
      const newBooking: Booking = {
        id: Date.now().toString(),
        studentId: form.studentId!,
        roomId: form.roomId!,
        from: form.from!,
        to: form.to!,
      };
      const updated = [...bookings, newBooking];
      setBookings(updated);
      setItem(STORAGE_KEY, updated);
    }
    setForm({});
  };

  const handleEdit = (id: string) => {
    const booking = bookings.find((b) => b.id === id);
    if (booking) {
      setForm(booking);
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    setItem(STORAGE_KEY, updated);
    if (editingId === id) {
      setEditingId(null);
      setForm({});
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap items-end">
        <select
          name="studentId"
          value={form.studentId || ""}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1"
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select
          name="roomId"
          value={form.roomId || ""}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1"
        >
          <option value="">Select Room</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>{r.number}</option>
          ))}
        </select>
        <Input
          name="from"
          type="date"
          value={form.from || ""}
          onChange={handleChange}
          required
        />
        <Input
          name="to"
          type="date"
          value={form.to || ""}
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
            <th>Student</th>
            <th>Room</th>
            <th>From</th>
            <th>To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{students.find((s) => s.id === booking.studentId)?.name || "-"}</td>
              <td>{rooms.find((r) => r.id === booking.roomId)?.number || "-"}</td>
              <td>{booking.from}</td>
              <td>{booking.to}</td>
              <td>
                <Button size="sm" onClick={() => handleEdit(booking.id)}>
                  Edit
                </Button>{" "}
                <Button size="sm" variant="destructive" onClick={() => handleDelete(booking.id)}>
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