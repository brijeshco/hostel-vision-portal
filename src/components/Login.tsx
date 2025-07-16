import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/ui/logo';
import { UserCog, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { authenticate } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    admin: { email: 'admin@hostel.com', password: 'admin123' },
    student: { email: 'student@hostel.com', password: 'student123' }
  });
  
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (role: 'admin' | 'student') => {
    setIsLoading(true);
    
    try {
      const user = authenticate(credentials[role]);
      if (user) {
        login(user);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCredentials = (role: 'admin' | 'student', field: 'email' | 'password', value: string) => {
    setCredentials(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center">
          <Logo className="justify-center mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/80">Sign in to access your hostel portal</p>
        </div>

        <Card className="shadow-elegant backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Student
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={credentials.admin.email}
                    onChange={(e) => updateCredentials('admin', 'email', e.target.value)}
                    placeholder="admin@hostel.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.admin.password}
                      onChange={(e) => updateCredentials('admin', 'password', e.target.value)}
                      placeholder="admin123"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={() => handleLogin('admin')} 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in as Admin"}
                </Button>
              </TabsContent>

              <TabsContent value="student" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    value={credentials.student.email}
                    onChange={(e) => updateCredentials('student', 'email', e.target.value)}
                    placeholder="student@hostel.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="student-password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.student.password}
                      onChange={(e) => updateCredentials('student', 'password', e.target.value)}
                      placeholder="student123"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={() => handleLogin('student')} 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in as Student"}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-2">Demo Credentials:</h4>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p><strong>Admin:</strong> admin@hostel.com / admin123</p>
                <p><strong>Student:</strong> student@hostel.com / student123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};