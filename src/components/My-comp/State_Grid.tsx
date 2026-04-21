import React from "react";
import { Card, CardContent } from "../ui/card";

export default function State_Grid({
  timeLeft,
  wpm,
  Accuracy,
  completed,
}: {
  timeLeft: number;
  wpm: number;
  Accuracy: number;
  completed: number;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-15">
      {[
        { label: "Time Left", value: `${timeLeft}s` },
        { label: "Words/Sec", value: `${wpm}` }, // calculate properly later
        {
          label: "Accuracy",
          value: `${Accuracy}%`,
          color: "text-green-400",
        },
        { label: "Completed", value: completed },
      ].map((stat) => (
        <Card
          key={stat.label}
          className="bg-background text-center border-0 rounded-[15px]"
        >
          <CardContent className=" ">
            <p className="text-sm opacity-70">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color || ""} mt-5`}>
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
