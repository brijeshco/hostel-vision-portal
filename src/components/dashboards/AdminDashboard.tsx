import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench
} from 'lucide-react';
import { 
  ROOMS, 
  BOOKINGS, 
  STUDENTS, 
  getTotalOccupancy, 
  getMonthlyRevenue,
  getAvailableRooms,
  getOccupiedRooms,
  getMaintenanceRooms
} from '@/lib/mockData';

export const AdminDashboard: React.FC = () => {
  const occupancy = getTotalOccupancy();
  const monthlyRevenue = getMonthlyRevenue();
  const availableRooms = getAvailableRooms();
  const occupiedRooms = getOccupiedRooms();
  const maintenanceRooms = getMaintenanceRooms();
  const pendingBookings = BOOKINGS.filter(b => b.status === 'pending');

  const stats = [
    {
      title: 'Total Rooms',
      value: ROOMS.length,
      icon: Building2,
      description: `${occupancy.totalCapacity} bed capacity`,
      color: 'text-blue-600'
    },
    {
      title: 'Occupancy Rate',
      value: `${occupancy.occupancyRate.toFixed(1)}%`,
      icon: TrendingUp,
      description: `${occupancy.totalOccupied}/${occupancy.totalCapacity} occupied`,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${monthlyRevenue.toLocaleString()}`,
      icon: CreditCard,
      description: 'Current month collections',
      color: 'text-purple-600'
    },
    {
      title: 'Total Students',
      value: STUDENTS.length,
      icon: Users,
      description: `${pendingBookings.length} pending approvals`,
      color: 'text-orange-600'
    }
  ];

  const roomStatusData = [
    { label: 'Available', count: availableRooms.length, color: 'bg-success', icon: CheckCircle },
    { label: 'Occupied', count: occupiedRooms.length, color: 'bg-primary', icon: Users },
    { label: 'Maintenance', count: maintenanceRooms.length, color: 'bg-warning', icon: Wrench },
  ];

  const recentBookings = BOOKINGS.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening in your hostel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button className="bg-gradient-primary">
            <Building2 className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Room Status Overview
            </CardTitle>
            <CardDescription>Current status of all rooms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roomStatusData.map((status, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${status.color}/10`}>
                    <status.icon className={`h-4 w-4 ${status.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className="font-medium">{status.label}</span>
                </div>
                <Badge variant="secondary">{status.count} rooms</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Bookings
            </CardTitle>
            <CardDescription>Latest booking requests and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{booking.studentName}</span>
                      <span className="text-xs text-muted-foreground">Room {booking.roomNumber}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        booking.status === 'active' ? 'default' :
                        booking.status === 'pending' ? 'secondary' : 'destructive'
                      }
                    >
                      {booking.status}
                    </Badge>
                    {booking.status === 'pending' && (
                      <Clock className="h-4 w-4 text-warning" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Manage Students</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Building2 className="h-6 w-6" />
              <span className="text-sm">Room Allocation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Payment Records</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertCircle className="h-6 w-6" />
              <span className="text-sm">Maintenance Issues</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};