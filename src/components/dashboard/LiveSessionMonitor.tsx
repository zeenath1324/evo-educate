import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Mic, Brain, AlertCircle } from "lucide-react";

interface Student {
  id: string;
  name: string;
  emotion: string;
  engagement: number;
  status: "active" | "confused" | "inactive";
  lastActivity: string;
}

export const LiveSessionMonitor = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Alice Johnson", emotion: "focused", engagement: 92, status: "active", lastActivity: "2s ago" },
    { id: "2", name: "Bob Smith", emotion: "confused", engagement: 45, status: "confused", lastActivity: "5s ago" },
    { id: "3", name: "Carol Brown", emotion: "engaged", engagement: 88, status: "active", lastActivity: "1s ago" },
    { id: "4", name: "David Wilson", emotion: "neutral", engagement: 72, status: "active", lastActivity: "3s ago" },
    { id: "5", name: "Eva Martinez", emotion: "excited", engagement: 95, status: "active", lastActivity: "1s ago" },
    { id: "6", name: "Frank Davis", emotion: "neutral", engagement: 30, status: "inactive", lastActivity: "45s ago" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStudents(prev => prev.map(student => ({
        ...student,
        engagement: Math.max(20, Math.min(100, student.engagement + (Math.random() - 0.5) * 10)),
        emotion: Math.random() > 0.8 ? 
          ["focused", "confused", "engaged", "neutral", "excited"][Math.floor(Math.random() * 5)] : 
          student.emotion,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "confused": return "warning";
      case "inactive": return "destructive";
      default: return "secondary";
    }
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 80) return "text-success";
    if (engagement >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Live Feed */}
      <Card className="lg:col-span-2 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Live Student Monitoring
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Camera className="h-4 w-4" />
                <Mic className="h-4 w-4" />
                <Brain className="h-4 w-4" />
              </div>
              <Badge variant="outline" className="bg-success/10 text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                Recording
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Emotion: {student.emotion}</span>
                      <span>•</span>
                      <span>Last seen: {student.lastActivity}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`font-bold ${getEngagementColor(student.engagement)}`}>
                      {student.engagement}%
                    </div>
                    <div className="text-xs text-muted-foreground">engagement</div>
                  </div>
                  
                  <Badge variant={getStatusColor(student.status) as any}>
                    {student.status}
                  </Badge>
                  
                  {student.status === "confused" && (
                    <Button variant="outline" size="sm">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Help
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Stats */}
      <div className="space-y-6">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Session Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Students</span>
                <span className="font-bold">{students.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Now</span>
                <span className="font-bold text-success">
                  {students.filter(s => s.status === "active").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Need Help</span>
                <span className="font-bold text-warning">
                  {students.filter(s => s.status === "confused").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Engagement</span>
                <span className="font-bold">
                  {Math.round(students.reduce((acc, s) => acc + s.engagement, 0) / students.length)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                Send Encouraging Message
              </Button>
              <Button className="w-full" variant="outline">
                Adjust Difficulty
              </Button>
              <Button className="w-full" variant="outline">
                Take Break
              </Button>
              <Button className="w-full bg-gradient-primary">
                Generate Summary
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};