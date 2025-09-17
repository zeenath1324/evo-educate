import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const EngagementHeatmap = () => {
  const heatmapData = [
    [85, 92, 78, 88, 95, 82, 90],
    [72, 88, 95, 85, 78, 92, 87],
    [90, 76, 82, 94, 88, 85, 91],
    [88, 94, 89, 76, 92, 87, 84],
    [82, 87, 91, 88, 85, 94, 89],
  ];

  const getEngagementColor = (value: number) => {
    if (value >= 90) return "bg-engagement-high";
    if (value >= 75) return "bg-engagement-medium";
    return "bg-engagement-low";
  };

  const getEngagementLevel = (value: number) => {
    if (value >= 90) return "High";
    if (value >= 75) return "Medium";
    return "Low";
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Real-time Engagement Heatmap
          <Badge variant="secondary">Live Data</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            {heatmapData.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-7 gap-2">
                {row.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className={`aspect-square rounded-lg ${getEngagementColor(value)} flex items-center justify-center text-white text-sm font-bold transition-all hover:scale-105 cursor-pointer`}
                    title={`${getEngagementLevel(value)} Engagement: ${value}%`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-engagement-low rounded"></div>
                <span className="text-sm">Low (60-74%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-engagement-medium rounded"></div>
                <span className="text-sm">Medium (75-89%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-engagement-high rounded"></div>
                <span className="text-sm">High (90%+)</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: 2 minutes ago
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};