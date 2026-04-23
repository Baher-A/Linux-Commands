// components/TestResults.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Command_Details } from "./Command_Details";
import { AlertDialog } from "../ui/alert-dialog";
import { ChartColumnStacked, ShieldX, SquareTerminal } from "lucide-react";
import Reset_Btn from "./Reset_Btn";

interface CommandResult {
  mistakes: number;
  accuracy: number;
  command: {
    Command: string;
    describe: string;
    example: string;
  };
}

interface TestResultsProps {
  results: CommandResult[];
  totalMistakes: number;
  totalAccuracy: number;
  reset: () => void;
}

export function Result_Table({
  results,
  totalMistakes,
  totalAccuracy,
  reset,
}: TestResultsProps) {
  const mistakesTotal =
    totalMistakes ?? results.reduce((sum, r) => sum + r.mistakes, 0);
  const accuracyAvg =
    totalAccuracy ??
    Math.round(
      results.reduce((sum, r) => sum + r.accuracy, 0) / results.length,
    );

  return (
    <div className="rounded-lg  text-card-foreground shadow-sm border-2 border-terminal-border bg-card-bg/50">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border/50 hover:bg-transparent ">
            <TableHead className="text-green-500 font-semibold p-5">
              <SquareTerminal
                className="inline-block mr-2 text-yellow-500 stroke-3"
                size={18}
              />
              Command
            </TableHead>
            <TableHead className="text-green-500 font-semibold ">
              <ShieldX
                className="inline-block mr-2 stroke-3 text-yellow-500"
                size={18}
              />
              Mistakes
            </TableHead>
            <TableHead className="text-green-500 font-semibold">
              <ChartColumnStacked
                className="inline-block mr-2  stroke-3 text-yellow-500"
                size={18}
              />
              Accuracy
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {results.map((item, index) => (
            <AlertDialog key={index}>
              <Command_Details item={item} />
            </AlertDialog>
          ))}

          {/* Total Row */}
          <TableRow className="border-t border-green-500/30 bg-muted/40 hover:bg-muted transition-colors duration-500">
            <TableCell className="font-semibold p-5 text-yellow-500">
              Total
            </TableCell>
            <TableCell className="font-semibold text-yellow-500 px-7">
              {mistakesTotal}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress
                  value={accuracyAvg}
                  className="h-2 flex-1 bg-green-500"
                />
                <span className="text-sm font-semibold text-green-400 min-w-14 text-right">
                  {accuracyAvg}%
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4 w-full mx-auto my-5">
        <Reset_Btn reset={reset} text="Try Again" />
      </div>
    </div>
  );
}
