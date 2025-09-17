import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Target, Zap } from "lucide-react";

interface QuizInterfaceProps {
  emotion: string;
  engagementLevel: number;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
}

export const QuizInterface = ({ emotion, engagementLevel }: QuizInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the discriminant of the quadratic equation x² - 4x + 4 = 0?",
      options: ["0", "16", "8", "-16"],
      correct: 0,
      difficulty: "medium",
      explanation: "The discriminant is b² - 4ac = (-4)² - 4(1)(4) = 16 - 16 = 0"
    },
    {
      id: 2,
      question: "How many real solutions does x² + 2x + 5 = 0 have?",
      options: ["0", "1", "2", "3"],
      correct: 0,
      difficulty: emotion === "confused" ? "easy" : "medium",
      explanation: "The discriminant is 4 - 20 = -16 < 0, so there are no real solutions"
    },
    {
      id: 3,
      question: "What is the vertex of the parabola y = (x - 2)² + 3?",
      options: ["(2, 3)", "(-2, 3)", "(2, -3)", "(-2, -3)"],
      correct: 0,
      difficulty: "easy",
      explanation: "In vertex form y = (x - h)² + k, the vertex is (h, k) = (2, 3)"
    }
  ];

  // Adaptive difficulty based on emotion and engagement
  const getCurrentQuestion = () => {
    const question = questions[currentQuestion];
    if (emotion === "confused" || engagementLevel < 60) {
      return { ...question, difficulty: "easy" as const };
    }
    return question;
  };

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeOut();
    }
  }, [timeLeft, showResult]);

  const handleTimeOut = () => {
    setShowResult(true);
    setStreak(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    const question = getCurrentQuestion();
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      // Quiz completed
      console.log("Quiz completed! Final score:", score);
    }
  };

  const question = getCurrentQuestion();
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Adaptive Quiz
            </span>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                {score}/{questions.length}
              </Badge>
              {streak > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {streak} streak!
                </Badge>
              )}
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeLeft}s
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(currentQuestion / questions.length) * 100} className="mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Difficulty: {question.difficulty}</span>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={`w-full text-left justify-start h-auto p-4 ${
                  selectedAnswer === index ? "bg-gradient-primary" : ""
                } ${
                  showResult && index === question.correct 
                    ? "border-success bg-success/10" 
                    : ""
                } ${
                  showResult && selectedAnswer === index && !isCorrect
                    ? "border-destructive bg-destructive/10"
                    : ""
                }`}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <span className="mr-3 font-mono">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>

          {/* Result Feedback */}
          {showResult && (
            <Card className={`border-l-4 ${isCorrect ? "border-l-success bg-success/5" : "border-l-destructive bg-destructive/5"}`}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    isCorrect ? "bg-success" : "bg-destructive"
                  }`}>
                    {isCorrect ? "✓" : "✗"}
                  </div>
                  <div>
                    <h4 className={`font-medium ${isCorrect ? "text-success" : "text-destructive"}`}>
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {!showResult ? (
              <Button 
                onClick={handleSubmit} 
                disabled={selectedAnswer === null}
                className="bg-gradient-primary"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-gradient-primary">
                {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
              </Button>
            )}
            
            {emotion === "confused" && (
              <Button variant="outline">
                Get Hint
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gamification Elements */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-elegant text-center">
          <CardContent className="pt-4">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-warning" />
            <div className="text-lg font-bold">{score * 10}</div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant text-center">
          <CardContent className="pt-4">
            <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">{streak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant text-center">
          <CardContent className="pt-4">
            <Target className="h-8 w-8 mx-auto mb-2 text-success" />
            <div className="text-lg font-bold">{Math.round((score / (currentQuestion + 1)) * 100)}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};