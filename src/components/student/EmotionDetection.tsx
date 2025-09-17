import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";

interface EmotionDetectionProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export const EmotionDetection = ({ isActive, onToggle }: EmotionDetectionProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioPermission, setAudioPermission] = useState(false);
  const [videoPermission, setVideoPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startDetection = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setStream(mediaStream);
      setVideoPermission(true);
      setAudioPermission(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      onToggle(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopDetection = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setVideoPermission(false);
    setAudioPermission(false);
    onToggle(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant={isActive ? "default" : "outline"}
          size="sm"
          onClick={isActive ? stopDetection : startDetection}
          className={isActive ? "bg-gradient-primary" : ""}
        >
          {isActive ? <Camera className="h-4 w-4 mr-2" /> : <CameraOff className="h-4 w-4 mr-2" />}
          {isActive ? "Stop Detection" : "Start Detection"}
        </Button>
        
        {isActive && (
          <div className="flex items-center gap-1">
            <Badge variant={videoPermission ? "secondary" : "destructive"} className="text-xs">
              <Camera className="h-3 w-3 mr-1" />
              Video
            </Badge>
            <Badge variant={audioPermission ? "secondary" : "destructive"} className="text-xs">
              <Mic className="h-3 w-3 mr-1" />
              Audio
            </Badge>
          </div>
        )}
      </div>

      {isActive && stream && (
        <Card className="fixed top-4 right-4 z-50 shadow-glow">
          <CardContent className="p-2">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-32 h-24 rounded-md object-cover"
            />
            <div className="text-xs text-center mt-1 text-muted-foreground">
              Emotion Detection Active
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};