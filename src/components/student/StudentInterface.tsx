import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningModule } from "./LearningModule";
import { QuizInterface } from "./QuizInterface";
import { ARContentViewer } from "./ARContentViewer";
import { EmotionDetection } from "./EmotionDetection";
import { ArrowLeft, Camera, Mic, Brain, Gamepad2 } from "lucide-react";

interface StudentInterfaceProps {
  onBack: () => void;
}

export const StudentInterface = ({ onBack }: StudentInterfaceProps) => {
  const [isDetectionActive, setIsDetectionActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState("neutral");
  const [engagementLevel, setEngagementLevel] = useState(75);

  useEffect(() => {
    if (isDetectionActive) {
      const interval = setInterval(() => {
        const emotions = ["focused", "confused", "engaged", "neutral", "excited"];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setCurrentEmotion(randomEmotion);
        setEngagementLevel(Math.floor(Math.random() * 40) + 60);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isDetectionActive]);

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "focused":
      case "engaged": return "success";
      case "excited": return "primary";
      case "confused": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Learning Interface</h1>
                <p className="text-muted-foreground">AI-powered adaptive learning experience</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <EmotionDetection 
                isActive={isDetectionActive}
                onToggle={setIsDetectionActive}
              />
              
              {isDetectionActive && (
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={getEmotionColor(currentEmotion) as any}
                    className="capitalize"
                  >
                    {currentEmotion}
                  </Badge>
                  <Badge variant="outline">
                    {engagementLevel}% engaged
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Interface */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="learning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Learning
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="ar" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              AR/3D Content
            </TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="learning" className="space-y-6">
            <LearningModule 
              emotion={currentEmotion}
              engagementLevel={engagementLevel}
            />
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <QuizInterface 
              emotion={currentEmotion}
              engagementLevel={engagementLevel}
            />
          </TabsContent>

          <TabsContent value="ar" className="space-y-6">
            <ARContentViewer />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Mathematics</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Physics</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-secondary h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Chemistry</span>
                    <span>91%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};