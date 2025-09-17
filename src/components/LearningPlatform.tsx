import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeacherDashboard } from "./dashboard/TeacherDashboard";
import { StudentInterface } from "./student/StudentInterface";
import { GraduationCap, Users, BookOpen, TrendingUp } from "lucide-react";

export const LearningPlatform = () => {
  const [userType, setUserType] = useState<"teacher" | "student" | null>(null);

  if (userType === "teacher") {
    return <TeacherDashboard onBack={() => setUserType(null)} />;
  }

  if (userType === "student") {
    return <StudentInterface onBack={() => setUserType(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium">Next-Gen Learning Platform</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Smart Learning with
              <br />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                AI-Powered Insights
              </span>
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Real-time emotion detection, adaptive content delivery, and comprehensive analytics 
              for personalized learning experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 shadow-glow hover:shadow-xl transition-all duration-300"
                onClick={() => setUserType("teacher")}
              >
                <Users className="mr-2 h-5 w-5" />
                Teacher Dashboard
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                onClick={() => setUserType("student")}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Student Interface
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced AI-powered learning tools designed for modern education
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Real-time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Monitor engagement and learning patterns with AI-powered insights
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Adaptive Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Content automatically adjusts based on student comprehension
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Emotion Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Webcam and microphone analysis for engagement tracking
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Gamified Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Interactive assessments with instant feedback and scoring
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-muted-foreground">Built with cutting-edge AI and modern web technologies</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "TensorFlow", "OpenCV", "React", "Node.js", 
              "WebRTC", "PostgreSQL", "WebSockets", "NLP",
              "Unity WebXR", "Real-time Analytics"
            ].map((tech) => (
              <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};