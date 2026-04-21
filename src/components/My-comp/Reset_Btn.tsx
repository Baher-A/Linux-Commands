import React from "react";
import { Button } from "../ui/button";

export default function Reset_Btn({
  reset,
  text,
  timeLeft = 0,
  isRunning,
}: {
  reset: () => void;
  text: string;
  timeLeft?: number;
  isRunning?: boolean;
}) {
  return (
    <Button
      className=" px-12 py-4 bg-green-500 hover:bg-green-600 text-white w-fit cursor-pointer font-bold transition-all duration-200 ease-in"
      onClick={reset}
      disabled={isRunning && timeLeft > 0}
    >
      {text}
    </Button>
  );
}
