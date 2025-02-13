import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

const models = [
  { value: "phi4", label: "Phi-4" },
  { value: "deepseek-r1:8b", label: "DeepSeek 8B" },
  { value: "llama3.2", label: "Llama 3.2" },
  { value: "deepseek-r1:1.5b", label: "DeepSeek 1.5B" },
  { value: "gemma2", label: "Gemma 2" },
];

export default function ModelSelector({
  selectedModel,
  setSelectedModel,
}: {
  selectedModel: string;
  setSelectedModel: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="mb-4">
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
