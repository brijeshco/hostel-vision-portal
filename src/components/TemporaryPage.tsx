import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction, Wrench } from 'lucide-react';

interface TemporaryPageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
}

export const TemporaryPage: React.FC<TemporaryPageProps> = ({ 
  title, 
  description, 
  icon: Icon = Construction 
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-elegant text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl mb-2">{title}</CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
          </div>
          <Badge variant="secondary" className="mx-auto">
            <Wrench className="h-3 w-3 mr-1" />
            Under Development
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This feature is currently being developed and will be available soon. 
            All core functionality is planned for implementation.
          </p>
          
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/')} 
              className="w-full bg-gradient-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="w-full"
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};