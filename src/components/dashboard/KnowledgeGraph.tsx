import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, TrendingUp, AlertTriangle } from "lucide-react";

export const KnowledgeGraph = () => {
  const knowledgeNodes = [
    { id: 1, topic: "Algebra Basics", mastery: 92, x: 20, y: 30, connections: [2, 3] },
    { id: 2, topic: "Linear Equations", mastery: 78, x: 50, y: 20, connections: [4] },
    { id: 3, topic: "Quadratic Equations", mastery: 65, x: 40, y: 60, connections: [4] },
    { id: 4, topic: "Function Graphs", mastery: 45, x: 80, y: 40, connections: [] },
  ];

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return "success";
    if (mastery >= 60) return "warning";
    return "destructive";
  };

  const getMasteryIcon = (mastery: number) => {
    if (mastery >= 80) return <Zap className="h-4 w-4" />;
    if (mastery >= 60) return <TrendingUp className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Knowledge Graph
          <Button variant="outline" size="sm">
            Generate Adaptive Content
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Visual Graph */}
          <div className="relative bg-muted/20 rounded-lg p-8 h-80 overflow-hidden">
            <svg className="w-full h-full">
              {/* Connection Lines */}
              {knowledgeNodes.map((node) =>
                node.connections.map((connId) => {
                  const connNode = knowledgeNodes.find(n => n.id === connId);
                  if (!connNode) return null;
                  return (
                    <line
                      key={`${node.id}-${connId}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${connNode.x}%`}
                      y2={`${connNode.y}%`}
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  );
                })
              )}
              
              {/* Knowledge Nodes */}
              {knowledgeNodes.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r="25"
                    fill={`hsl(var(--${getMasteryColor(node.mastery)}))`}
                    className="opacity-20"
                  />
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r="20"
                    fill={`hsl(var(--${getMasteryColor(node.mastery)}))`}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                  <text
                    x={`${node.x}%`}
                    y={`${node.y + 8}%`}
                    textAnchor="middle"
                    className="fill-white text-xs font-bold"
                  >
                    {node.mastery}%
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Topic Details */}
          <div className="grid md:grid-cols-2 gap-4">
            {knowledgeNodes.map((node) => (
              <div key={node.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${getMasteryColor(node.mastery)}/10`}>
                    {getMasteryIcon(node.mastery)}
                  </div>
                  <div>
                    <h4 className="font-medium">{node.topic}</h4>
                    <p className="text-sm text-muted-foreground">Mastery Level</p>
                  </div>
                </div>
                <Badge variant={getMasteryColor(node.mastery) as any}>
                  {node.mastery}%
                </Badge>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-accent/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              AI Recommendations
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Focus on Function Graphs - detected confusion patterns</li>
              <li>• Provide visual aids for Quadratic Equations</li>
              <li>• Reinforce connection between Linear and Quadratic concepts</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};