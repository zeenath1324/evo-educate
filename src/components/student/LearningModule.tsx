import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, Lightbulb, ChevronRight, RotateCcw } from "lucide-react";

interface LearningModuleProps {
  emotion: string;
  engagementLevel: number;
}

export const LearningModule = ({ emotion, engagementLevel }: LearningModuleProps) => {
  const [currentTopic, setCurrentTopic] = useState("Quadratic Equations");
  const [contentLevel, setContentLevel] = useState("standard");
  const [progress, setProgress] = useState(65);
  const [adaptiveContent, setAdaptiveContent] = useState("");

  useEffect(() => {
    // Adaptive content based on emotion and engagement
    if (emotion === "confused" || engagementLevel < 60) {
      setContentLevel("simplified");
      setAdaptiveContent("Simplified explanation with visual aids");
    } else if (emotion === "engaged" && engagementLevel > 85) {
      setContentLevel("advanced");
      setAdaptiveContent("Advanced concepts with challenging examples");
    } else {
      setContentLevel("standard");
      setAdaptiveContent("Standard curriculum content");
    }
  }, [emotion, engagementLevel]);

  const getContentByLevel = () => {
    switch (contentLevel) {
      case "simplified":
        return {
          title: "Understanding Quadratic Equations (Simplified)",
          content: `Let's start with the basics! A quadratic equation is like a U-shaped curve.
          
Think of it as: ax² + bx + c = 0

🔹 'a' controls how wide or narrow the U is
🔹 'b' controls where the U tilts
🔹 'c' controls how high or low the U sits

Let's try a simple example: x² - 4 = 0
This means "what number times itself equals 4?"
The answer is 2 and -2!`,
          examples: ["x² = 4", "x² - 9 = 0", "x² + 1 = 10"],
        };
      case "advanced":
        return {
          title: "Advanced Quadratic Analysis",
          content: `Quadratic equations represent parabolic functions with rich mathematical properties.

For ax² + bx + c = 0, we can analyze:
• Discriminant: Δ = b² - 4ac
• Vertex form: a(x - h)² + k
• Factored form: a(x - r₁)(x - r₂)
• Completing the square method

Advanced applications include optimization problems and trajectory analysis.`,
          examples: ["3x² - 7x + 2 = 0", "x² - 6x + 9 = 0", "2x² + 5x - 3 = 0"],
        };
      default:
        return {
          title: "Quadratic Equations",
          content: `A quadratic equation is a polynomial equation of degree 2.
          
Standard form: ax² + bx + c = 0 (where a ≠ 0)

Solutions can be found using:
• Factoring
• Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a
• Completing the square
• Graphing

Quadratics have at most 2 real solutions and graph as parabolas.`,
          examples: ["x² - 5x + 6 = 0", "2x² + 3x - 1 = 0", "x² - 4x + 4 = 0"],
        };
    }
  };

  const content = getContentByLevel();

  return (
    <div className="space-y-6">
      {/* Adaptive Content Banner */}
      {contentLevel !== "standard" && (
        <Card className="shadow-elegant border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-primary">AI Adaptive Content</h4>
                <p className="text-sm text-muted-foreground">{adaptiveContent}</p>
              </div>
              <Badge variant="outline" className="ml-auto">
                {contentLevel}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Tracking */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Learning Progress
            <Badge variant="secondary">{progress}% Complete</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Topic: {currentTopic}</span>
            <span>Level: {contentLevel}</span>
          </div>
        </CardContent>
      </Card>

      {/* Main Learning Content */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {content.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-line text-foreground">{content.content}</p>
          </div>

          {/* Interactive Examples */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Practice Examples
            </h4>
            <div className="grid md:grid-cols-3 gap-3">
              {content.examples.map((example, index) => (
                <Card key={index} className="p-3 bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all">
                  <div className="text-center font-mono text-sm">{example}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button className="bg-gradient-primary">
              <ChevronRight className="h-4 w-4 mr-2" />
              Next Topic
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Review Previous
            </Button>
            <Button variant="outline">
              Get Help
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-lg">Visual Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-sm text-muted-foreground">
                Interactive graphs and visual representations
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-lg">Video Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <div className="text-4xl mb-2">🎥</div>
              <p className="text-sm text-muted-foreground">
                Step-by-step video tutorials
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};