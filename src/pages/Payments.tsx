import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../lib/localStorage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table } from "../components/ui/table";

interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  description: string;
}

interface Student {
  id: string;
  name: string;
}

const STORAGE_KEY = "payments";

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [form, setForm] = useState<Partial<Payment>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setPayments(getItem<Payment[]>(STORAGE_KEY) || []);
    setStudents(getItem<Student[]>("students") || []);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentId || !form.amount || !form.date || !form.description) return;
    if (editingId) {
      // Edit
      const updated = payments.map((p) =>
        p.id === editingId ? { ...p, ...form, id: editingId, amount: Number(form.amount) } : p
      );
      setPayments(updated);
      setItem(STORAGE_KEY, updated);
      setEditingId(null);
    } else {
      // Add
      const newPayment: Payment = {
        id: Date.now().toString(),
        studentId: form.studentId!,
        amount: Number(form.amount),
        date: form.date!,
        description: form.description!,
      };
      const updated = [...payments, newPayment];
      setPayments(updated);
      setItem(STORAGE_KEY, updated);
    }
    setForm({});
  };

  const handleEdit = (id: string) => {
    const payment = payments.find((p) => p.id === id);
    if (payment) {
      setForm(payment);
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
    const updated = payments.filter((p) => p.id !== id);
    setPayments(updated);
    setItem(STORAGE_KEY, updated);
    if (editingId === id) {
      setEditingId(null);
      setForm({});
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
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
        <Input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount || ""}
          onChange={handleChange}
          required
        />
        <Input
          name="date"
          type="date"
          value={form.date || ""}
          onChange={handleChange}
          required
        />
        <Input
          name="description"
          placeholder="Description"
          value={form.description || ""}
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
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{students.find((s) => s.id === payment.studentId)?.name || "-"}</td>
              <td>{payment.amount}</td>
              <td>{payment.date}</td>
              <td>{payment.description}</td>
              <td>
                <Button size="sm" onClick={() => handleEdit(payment.id)}>
                  Edit
                </Button>{" "}
                <Button size="sm" variant="destructive" onClick={() => handleDelete(payment.id)}>
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