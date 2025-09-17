import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Box, Play, Pause, RotateCw, ZoomIn, Eye } from "lucide-react";

export const ARContentViewer = () => {
  const [selectedModel, setSelectedModel] = useState("quadratic");
  const [isPlaying, setIsPlaying] = useState(false);

  const arContent = [
    {
      id: "quadratic",
      title: "Quadratic Functions in 3D",
      description: "Visualize parabolas and their transformations in three-dimensional space",
      preview: "📈",
      type: "3D Model"
    },
    {
      id: "molecules",
      title: "Molecular Structures",
      description: "Interactive 3D models of chemical compounds and their bonds",
      preview: "🧬",
      type: "Chemistry AR"
    },
    {
      id: "geometry",
      title: "Geometric Shapes",
      description: "Explore polyhedra, surface area, and volume calculations",
      preview: "🔷",
      type: "3D Geometry"
    },
    {
      id: "physics",
      title: "Physics Simulations",
      description: "Real-time physics demonstrations with interactive parameters",
      preview: "⚛️",
      type: "Physics AR"
    }
  ];

  const selectedContent = arContent.find(content => content.id === selectedModel);

  return (
    <div className="space-y-6">
      {/* AR/3D Content Selection */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="h-5 w-5" />
            AR/3D Learning Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {arContent.map((content) => (
              <Card 
                key={content.id}
                className={`cursor-pointer transition-all hover:shadow-glow ${
                  selectedModel === content.id ? "ring-2 ring-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedModel(content.id)}
              >
                <CardContent className="pt-4 text-center">
                  <div className="text-4xl mb-2">{content.preview}</div>
                  <h4 className="font-medium text-sm">{content.title}</h4>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {content.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3D Viewer */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {selectedContent?.title}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                WebXR Ready
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 3D Viewport Simulation */}
          <div className="relative bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            
            {/* 3D Content Placeholder */}
            <div className="relative z-10 text-center">
              <div className="text-8xl mb-4 animate-pulse">
                {selectedContent?.preview}
              </div>
              <h3 className="text-xl font-bold mb-2">{selectedContent?.title}</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                {selectedContent?.description}
              </p>
              
              {/* Interactive Elements */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* AR Overlay Simulation */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-black/20 text-white border-white/20">
                AR Mode Active
              </Badge>
            </div>
            
            <div className="absolute bottom-4 right-4">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                FPS: 60
              </Badge>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-primary">
                <Box className="h-4 w-4 mr-2" />
                Enter AR Mode
              </Button>
              <Button variant="outline">
                View in Fullscreen
              </Button>
              <Button variant="outline">
                Download Model
              </Button>
              <Button variant="outline">
                Share Content
              </Button>
            </div>

            {/* Feature Description */}
            <Card className="bg-accent/50">
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Interactive Features</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <ul className="space-y-1">
                    <li>• Real-time 3D manipulation</li>
                    <li>• Voice command integration</li>
                    <li>• Multi-touch gesture support</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• WebXR compatibility</li>
                    <li>• Cross-platform rendering</li>
                    <li>• Educational annotations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* WebXR Integration Status */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-lg">Platform Compatibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <span className="text-sm font-medium">WebXR</span>
              <Badge variant="secondary">Supported</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <span className="text-sm font-medium">Unity WebGL</span>
              <Badge variant="secondary">Ready</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <span className="text-sm font-medium">Mobile AR</span>
              <Badge variant="outline">Beta</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};