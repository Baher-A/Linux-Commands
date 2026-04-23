import Project_Brain from "@/components/My-comp/Project_Brain";
import Tips from "@/components/Section1/Tips";
import { Terminal } from "lucide-react";
export default function Home() {
  return (
    <div className=" bg-terminal-bg text-terminal-text font-mono container mx-auto ">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="p-5 rounded-2xl space-x-5 flex items-center shadow-2xl shadow-gray-950">
          <div className="p-2 w-fit rounded-lg bg-black border border-gray-800">
            <Terminal className="text-[#23b159] w-7 h-7 stroke-3 " />
          </div>

          <h1 className="text-2xl font-bold text-terminal-cyan drop-shadow-lg">
            Linux Command
            <span className="text-[#23b159]"> Speed Test</span>
          </h1>
        </div>

        {/* Typing Area */}
        <Project_Brain />

        {/* Tips */}
        <Tips />
      </div>
    </div>
  );
}
