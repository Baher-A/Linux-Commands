"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Result from "@/components/My-comp/Result";
import { sampleCommands } from "@/lib/Data";
export type Commands_Type = {
  id?: number;
  accuracy: number;
  command: {
    Command: string;
    describe: string;
    example: string;
  };
  mistakes: number;
};

import React from "react";
import { Circle, CornerDownRight } from "lucide-react";
import Reset_Btn from "./Reset_Btn";

export default function Project_Brain() {
  const [difficulty, setDifficulty] = useState("beginner");
  const [timeLimit, setTimeLimit] = useState(30);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [currentCommand, setCurrentCommand] = useState({
    Command: "",
    describe: "",
    example: "",
  });
  const [typed, setTyped] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [Accuracy, setAccuracy] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Commands_Type[]>([]);
  // Solution for Reset WPM calculation every changing command
  const [FullTypedCommands, setFullTypedCommands] = useState<string>("");

  const DrawCharacters = () => {
    return currentCommand.example.split("").map((char, i) => {
      let className = "text-muted-foreground  ";
      if (i < typed.length) {
        className =
          typed[i] === char
            ? "text-green-500"
            : "text-destructive bg-destructive/40";
      }

      return (
        <span
          key={i}
          className={`${className} ${typed.length == i ? "border-l border-yellow-500 animate-pulse" : "border-0"}  `}
        >
          {char}
        </span>
      );
    });
  };
  const handelonchangetype = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRunning || timeLeft === 0) return;
    setTyped(e.target.value);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(timeLimit);
    setTyped("");
    setMistakes(0);
    setWpm(0);
    setAccuracy(null);
    setCompleted([]);
    setStartTime(null);
    setFullTypedCommands("");
  };
  const progress = (typed.length / currentCommand.example.length) * 100;
  const pickupcommand = () => {
    const commands = sampleCommands[difficulty as keyof typeof sampleCommands];
    const comand = commands[Math.floor(Math.random() * commands.length)];
    setCurrentCommand({
      Command: comand.command,
      describe: comand.description,
      example: comand.example,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
    pickupcommand();
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft === 0) {
      // eslint-disable-next-line
      setIsRunning(false);
      return;
    }
    if (isRunning) {
      if (
        typed[typed.length - 1] !== currentCommand.example[typed.length - 1]
      ) {
        setMistakes(mistakes + 1);
      }
      setAccuracy(
        Math.max(
          0,
          Math.round(
            ((currentCommand.example.length - mistakes) /
              currentCommand.example.length) *
              100,
          ),
        ),
      );

      if (typed.length === currentCommand.example.length) {
        setFullTypedCommands((prev) => prev + typed);
        const Command_Details = {
          id: completed.length,
          accuracy: Accuracy ? Accuracy : 0,
          command: currentCommand,
          mistakes: mistakes,
        };
        // eslint-disable-next-line
        setCompleted((prev) => [...prev, Command_Details]);
        pickupcommand();
        setTyped("");
        setMistakes(0);
      }
    }
  }, [typed, isRunning, startTime]);
  useEffect(() => {
    if (startTime && isRunning) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const wordsTyped = FullTypedCommands.length / 5;
      const currentWpm = Math.round(wordsTyped / timeElapsed);
      // eslint-disable-next-line
      setWpm(currentWpm > 0 ? currentWpm : 0);
    }
  }, [FullTypedCommands, startTime, isRunning]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      // eslint-disable-next-line
      setAccuracy(
        Math.round(
          completed.reduce((sum, r) => sum + r.accuracy, 0) / completed.length,
        ),
      );
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, completed]);

  return (
    <>
      {/* Controls */}
      <div className="bg-terminal-card border-terminal-border">
        <div className="pt-6">
          <div className="grid sm:grid-cols-2 grid-cols-1 items-center justify-center gap-7">
            <div className=" bg-card-bg flex gap-5 items-center shadow-2xl p-5 w-full rounded-lg">
              <h4 className="text-terminal-text text-sm">Difficulty</h4>
              <Select
                value={difficulty}
                onValueChange={setDifficulty}
                disabled={timeLeft > 0 && isRunning}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className=" bg-card-bg flex gap-5 items-center shadow-2xl shadow-gray-950 p-5 w-full border border-terminal-border rounded-lg">
              <h4 className="text-terminal-text text-sm text-nowrap">
                Time Out
              </h4>
              <Select
                value={timeLimit.toString()}
                onValueChange={(v) => setTimeLimit(Number(v))}
                disabled={timeLeft > 0 && isRunning}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15s</SelectItem>
                  <SelectItem value="30">30s</SelectItem>
                  <SelectItem value="60">60s</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-fit mx-auto mt-5">
            <Reset_Btn
              reset={reset}
              text="Confirm"
              timeLeft={timeLeft}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        {[
          {
            label: "Time Left",
            value: `00:${timeLeft}s`,
            color:
              timeLeft > 5
                ? timeLeft > 10
                  ? "text-cyan-400"
                  : "text-yellow-500"
                : "text-red-400",
          },
          { label: "Words/Sec", value: `${wpm}`, color: "text-green-400" },
          {
            label: "Accuracy",
            value: `${Accuracy ? Accuracy : 100}%`,
            color: "text-green-400",
          },
          {
            label: "Completed",
            value: completed.length,
            color: "text-green-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card-bg p-5 rounded-lg border border-terminal-border text-center "
          >
            <div className="pt-4 space-y-2">
              <p className="text-xs opacity-70">{stat.label}</p>
              <p
                className={`text-2xl font-bold ${stat.color} transition-all duration-1000`}
              >
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card-bg p-3 pb-3 rounded-lg border-4 border-terminal-border shadow-2xl shadow-gray-950">
        <p className="my-5 text-center">
          Type Command -{" "}
          <span className="text-yellow-500 capitalize">{difficulty} </span>-
        </p>

        <div
          onClick={() => {
            inputRef.current?.focus();
            setIsRunning(true);
            if (timeLeft != 0 && startTime == null) {
              setStartTime(Date.now());
            }
          }}
          className="bg-black/60 p-4 relative min-h-[80px] w-full  focus:outline-none rounded-[9px] flex items-center "
        >
          {/* Overlay typed text with highlighting */}
          <input
            ref={inputRef}
            value={typed}
            onChange={handelonchangetype}
            disabled={timeLeft === 0 ? true : false}
            className="absolute inset-0 pointer-events-none h-full opacity-0  "
          />
          <div className="w-full">
            <div className="flex gap-2 mb-3 ">
              <Circle className="text-red-500 h-3 w-3 stroke-3" />
              <Circle className="text-yellow-500 h-3 w-3 stroke-3" />
              <Circle className="text-green-500 h-3 w-3 stroke-3" />
            </div>
            <span className="block text-terminal-text">Ex:</span>
            <div className="text-wrap inline-flex items-center w-full cursor-text">
              <CornerDownRight className="ml-2 mr-2 text-yellow-500 stroke-3 w-4 h-4 " />
              <div>{DrawCharacters()}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-0.5  bg-muted-foreground" />
          <p className="text-sm text-right font-bold text-terminal-text ">
            Progress {Math.round(progress)}%
          </p>
        </div>
      </div>
      {/* Results 'll show when timeLeft === 0 */}
      {timeLeft === 0 && (
        <div
          className={`space-y-5 ${timeLeft === 0 ? "opacity-100 animate-in fade-in duration-1000" : "opacity-0"}`}
        >
          <Result reset={reset} completed_commands={completed} />
        </div>
      )}
    </>
  );
}
