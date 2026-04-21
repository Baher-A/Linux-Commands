import { BowArrow } from "lucide-react";
import { Commands_Type } from "./Project_Brain";
import { Result_Table } from "./Result_Table";
export default function Result({
  reset,
  completed_commands,
}: {
  reset: () => void;
  completed_commands: Commands_Type[];
}) {
  const totalMistakes = completed_commands.reduce(
    (sum, r) => sum + r.mistakes,
    0,
  );

  const totalAccuracy = Math.round(
    completed_commands.reduce((sum, r) => sum + r.accuracy, 0) /
      completed_commands.length,
  );
  return (
    <>
      <h1 className="text-2xl capitalize flex items-center gap-2 ">
        {" "}
        <BowArrow className="text-yellow-500 stroke-2" />
        Test Results
      </h1>
      <div className="w-full">
        <Result_Table
          reset={reset}
          results={completed_commands}
          totalMistakes={totalMistakes}
          totalAccuracy={totalAccuracy ?? 0}
        />
      </div>
    </>
  );
}
