"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Type } from "lucide-react";

// Dummy text data
const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "Technology is best when it brings people together.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts."
];

export default function Section1() {
  // --- State ---
  const [text, setText] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60); // Default 60s timer
  
  const inputRef = useRef<HTMLInputElement>(null);
    const resetGame = () => {
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setText(randomText);
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setTimeLeft(60);
    
    // Focus input
    setTimeout(() => inputRef.current?.focus(), 100);
  };


  // Initialize game
  useEffect(() => {
    // eslint-disable-next-line
    resetGame();
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !isFinished && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, isFinished , timeLeft]);

  useEffect(() => {
    if (startTime && !isFinished) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; 
      const wordsTyped = userInput.length / 5;
      const currentWpm = Math.round(wordsTyped / timeElapsed);
      // eslint-disable-next-line
      setWpm(currentWpm > 0 ? currentWpm : 0);
    }
  }, [userInput, startTime, isFinished]);



  const finishGame = () => {
    setIsFinished(true);
    setStartTime(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const val = e.target.value;

    // Start timer on first keystroke
    if (!startTime) {
      setStartTime(Date.now());
    }

    // Calculate Accuracy
    const currentInput = val;
    let correctChars = 0;
    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] === text[i]) {
          correctChars++;
      }
    }
    
    const currentAccuracy = currentInput.length > 0 
      ? Math.round((correctChars / currentInput.length) * 100) 
      : 100;
      
    setAccuracy(currentAccuracy);
    setUserInput(val);

    // Check if completed
    if (val.length >= text.length) {
      finishGame();
    }
  };

  const renderText = () => {
    return (
      text.split("").map((char, index) => {
      let colorClass = "text-muted-foreground";
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          colorClass = "text-green-500";
        } else {
          colorClass = "text-red-500";
        }
      } else if (index === userInput.length) {
        colorClass = "border-l-2  border-primary animate-pulse animate-pulse"; 
      }

      return (
            <span key={index} className={`${colorClass} text-xl font-medium `}>
          {char}
        </span>
        
      );
    })      );  
  };

  return (
    <div className="flex min-h-screen items-center justify-center  p-4  ">
      <Card className="w-full max-w-3xl shadow-xl ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
               Typing Speed Test
            </CardTitle>
            <CardDescription>Type the text below as fast as you can</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={resetGame} className="h-10 w-10">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-8">
          
          {/* --- Stats Bar --- */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
              <span className="text-sm ">WPM</span>
              <span className="text-3xl font-bold">{wpm}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
              <span className="text-sm ">Accuracy</span>
              <span className="text-3xl font-bold">{accuracy}%</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
              <span className="text-sm ">Time Left</span>
              <span className={`text-3xl font-bold ${timeLeft < 10 ? 'text-red-500' : ''}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* --- Timer Progress Bar --- */}
          <div className="space-y-1">
            <Progress value={((60 - timeLeft) / 60) * 100} className="h-2" />
          </div>

          {/* --- Typing Area --- */}
          <div 
            className="relative min-h-[150px] cursor-text rounded-lg border  p-8  transition-colors"
            onClick={() => inputRef.current?.focus()}
          >
            {/* The Visual Text */}
            <div className="font-mono leading-relaxed tracking-wide select-none">
              {renderText()}
            </div>

            {/* Hidden Input for capturing keystrokes */}
            <Input
              ref={inputRef}
              className="absolute inset-0 h-full w-full opacity-0 cursor-default"
              value={userInput}
              onChange={handleInputChange}
              autoFocus
            />
          </div>

          {/* --- Result Overlay (Optional) --- */}
          {isFinished && (
            <div className="flex justify-center pt-4">
               <Badge variant="secondary" className="text-lg px-4 py-2">
                 Test Completed! Final Score: {wpm} WPM
               </Badge>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}