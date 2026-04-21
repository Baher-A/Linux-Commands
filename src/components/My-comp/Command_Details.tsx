import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TableCell, TableRow } from "../ui/table";
import { Commands_Type } from "./Project_Brain";
import { Progress } from "../ui/progress";
import { Terminal } from "lucide-react";

export function Command_Details({ item }: { item: Commands_Type }) {
  return (
    <>
      <AlertDialogTrigger asChild>
        <TableRow className="border-b border-border/90 hover:border-primary/50  hover:bg-primary/10 transition-all duration-200 ease-in  cursor-pointer">
          <TableCell className="font-medium text-white/90 p-5">
            {item.command.Command}
          </TableCell>
          <TableCell className="text-white/80 px-7">{item.mistakes}</TableCell>
          <TableCell className="w-40">
            <div className="flex items-center gap-2">
              <Progress
                value={item.accuracy}
                className="h-2 flex-1 bg-card-bg/50 border border-terminal-border"
              />
              <span className="text-sm font-medium text-green-400 min-w-14 text-right">
                {item.accuracy}%
              </span>
            </div>
          </TableCell>
        </TableRow>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className=" w-full text-center text-2xl font-semibold text-yellow-400 flex items-center gap-3  ">
            <div className="p-2 w-fit rounded-lg bg-black border border-gray-800">
              <Terminal className="text-[#23b159] w-5 h-5 stroke-3 " />
            </div>
            {item.command.Command}
          </AlertDialogTitle>
          <AlertDialogDescription className=" flex flex-col   w-full gap-5 p-2">
            <span className="text-white text-[16px] border-l border-yellow-500  px-3 ">
              <strong className="text-primary font-semibold pr-3">Ex : </strong>
              {item.command.example}
            </span>
            <span className="text-white text-[16px] border-l border-yellow-500  px-3">
              <strong className="text-primary font-semibold pr-3 ">
                Used for :{" "}
              </strong>
              {item.command.describe}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="text-white/80 font-semibold px-8 py-3 cursor-pointer mt-3 ">
            I got it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
