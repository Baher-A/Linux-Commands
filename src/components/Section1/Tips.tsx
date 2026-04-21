import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Lightbulb } from "lucide-react";

export default function Tips() {
  return (
    <Card className="bg-terminal-card border-terminal-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-1">
          <Lightbulb className="fill-amber-400 text-amber-400 stroke-1" />
          Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-1 text-sm opacity-90">
          <li>Start with beginner difficulty to warm up</li>
          <li>Focus on accuracy first, then speed</li>
          <li>Take breaks between sessions to avoid fatigue</li>
          <li>Practice regularly to improve muscle memory</li>
        </ul>
      </CardContent>
    </Card>
  );
}
