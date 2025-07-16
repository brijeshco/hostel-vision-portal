import React, { useEffect, useState } from "react";
import { getItem } from "../lib/localStorage";

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    rooms: 0,
    bookings: 0,
    payments: 0,
    paymentsSum: 0,
  });

  useEffect(() => {
    const students = getItem<any[]>("students") || [];
    const rooms = getItem<any[]>("rooms") || [];
    const bookings = getItem<any[]>("bookings") || [];
    const payments = getItem<any[]>("payments") || [];
    setStats({
      students: students.length,
      rooms: rooms.length,
      bookings: bookings.length,
      payments: payments.length,
      paymentsSum: payments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0),
    });
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-lg font-semibold">Students</div>
          <div className="text-2xl">{stats.students}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-lg font-semibold">Rooms</div>
          <div className="text-2xl">{stats.rooms}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-lg font-semibold">Bookings</div>
          <div className="text-2xl">{stats.bookings}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-lg font-semibold">Payments</div>
          <div className="text-2xl">{stats.payments}</div>
          <div className="text-sm text-gray-500">Total: ₹{stats.paymentsSum}</div>
        </div>
      </div>
    </div>
  );
}