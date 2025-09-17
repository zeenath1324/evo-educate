import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const StudentAnalytics = () => {
  const engagementData = [
    { time: "09:00", engagement: 65, focus: 70 },
    { time: "09:15", engagement: 78, focus: 75 },
    { time: "09:30", engagement: 85, focus: 80 },
    { time: "09:45", engagement: 72, focus: 68 },
    { time: "10:00", engagement: 88, focus: 85 },
    { time: "10:15", engagement: 92, focus: 90 },
    { time: "10:30", engagement: 76, focus: 72 },
  ];

  const topicPerformance = [
    { topic: "Algebra", score: 92, time: 45 },
    { topic: "Geometry", score: 78, time: 52 },
    { topic: "Calculus", score: 85, time: 38 },
    { topic: "Statistics", score: 67, time: 48 },
    { topic: "Trigonometry", score: 74, time: 42 },
  ];

  const emotionDistribution = [
    { name: "Focused", value: 35, color: "hsl(var(--success))" },
    { name: "Engaged", value: 28, color: "hsl(var(--primary))" },
    { name: "Neutral", value: 20, color: "hsl(var(--muted-foreground))" },
    { name: "Confused", value: 12, color: "hsl(var(--warning))" },
    { name: "Frustrated", value: 5, color: "hsl(var(--destructive))" },
  ];

  return (
    <div className="space-y-6">
      {/* Engagement Over Time */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Engagement Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="focus" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Topic Performance */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Topic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topicPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="topic" 
                  stroke="hsl(var(--muted-foreground))"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="score" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Emotion Distribution */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Emotional States</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emotionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {emotionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-2">
              {emotionDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">89%</div>
              <div className="text-sm text-muted-foreground">Avg Accuracy</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.2min</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">12</div>
              <div className="text-sm text-muted-foreground">Help Requests</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">94%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};