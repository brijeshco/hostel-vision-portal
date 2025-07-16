import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Calendar, 
  CreditCard, 
  User, 
  Bell,
  Home,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BOOKINGS, 
  PAYMENTS, 
  ROOMS,
  getStudentBookings,
  getStudentPayments
} from '@/lib/mockData';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const studentBookings = getStudentBookings(user.id);
  const studentPayments = getStudentPayments(user.id);
  const currentBooking = studentBookings.find(b => b.status === 'active');
  const currentRoom = currentBooking ? ROOMS.find(r => r.id === currentBooking.roomId) : null;
  
  const totalPaid = studentPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = currentBooking ? currentBooking.totalAmount - totalPaid : 0;

  const stats = [
    {
      title: 'Current Room',
      value: currentRoom ? `Room ${currentRoom.number}` : 'Not Allocated',
      icon: Home,
      description: currentRoom ? `Floor ${currentRoom.floor} • ${currentRoom.type}` : 'Apply for room allocation',
      color: 'text-blue-600'
    },
    {
      title: 'Booking Status',
      value: currentBooking?.status || 'No Booking',
      icon: Calendar,
      description: currentBooking ? 'Active booking' : 'No active booking',
      color: 'text-green-600'
    },
    {
      title: 'Payment Status',
      value: `₹${totalPaid.toLocaleString()}`,
      icon: CreditCard,
      description: pendingAmount > 0 ? `₹${pendingAmount} pending` : 'All payments up to date',
      color: pendingAmount > 0 ? 'text-orange-600' : 'text-green-600'
    },
    {
      title: 'Notifications',
      value: '3',
      icon: Bell,
      description: '2 payment reminders, 1 announcement',
      color: 'text-purple-600'
    }
  ];

  const recentPayments = studentPayments.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}! Here's your hostel information.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          {!currentBooking && (
            <Button className="bg-gradient-primary">
              <Building2 className="mr-2 h-4 w-4" />
              Apply for Room
            </Button>
          )}
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
        {/* Current Room Details */}
        {currentRoom && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Current Room Details
              </CardTitle>
              <CardDescription>Your assigned accommodation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Room Number</span>
                <Badge variant="default">{currentRoom.number}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Room Type</span>
                <span className="capitalize">{currentRoom.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Floor</span>
                <span>Floor {currentRoom.floor}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Monthly Rent</span>
                <span className="font-semibold">₹{currentRoom.monthlyRent.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-medium mb-2 block">Facilities</span>
                <div className="flex flex-wrap gap-2">
                  {currentRoom.facilities.map((facility, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Payments */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Recent Payments
            </CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        payment.status === 'completed' ? 'bg-success/10' : 'bg-warning/10'
                      }`}>
                        {payment.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          <Clock className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{payment.description}</span>
                        <span className="text-xs text-muted-foreground">
                          {payment.date.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{payment.amount.toLocaleString()}</div>
                      <Badge 
                        variant={payment.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No payments recorded yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used student services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Make Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Building2 className="h-6 w-6" />
              <span className="text-sm">Room Change Request</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertCircle className="h-6 w-6" />
              <span className="text-sm">Report Issue</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <User className="h-6 w-6" />
              <span className="text-sm">Update Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-primary bg-primary/5 rounded-r-lg">
              <div className="font-medium text-sm">Monthly Fee Due Reminder</div>
              <div className="text-xs text-muted-foreground mt-1">
                Your monthly hostel fee is due on 5th of each month. Please ensure timely payment.
              </div>
            </div>
            <div className="p-3 border-l-4 border-warning bg-warning/5 rounded-r-lg">
              <div className="font-medium text-sm">Maintenance Schedule</div>
              <div className="text-xs text-muted-foreground mt-1">
                WiFi maintenance scheduled for this weekend. Temporary interruption expected.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};