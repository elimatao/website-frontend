'use client';
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function YearInput({ 
  value, 
  range,
  onChange 
}: { 
  value: number, 
  range: [number, number],
  onChange: (val: number) => void 
}) {
  // 1. Local state handles the "messy" typing process
  const [localValue, setLocalValue] = useState(value.toString());

  // 2. Sync local state if the global value changes (e.g. via Reset button)
  useEffect(() => {
    setLocalValue(value.toString());
    console.log("yearrange hook called on input with value:", value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    const num = parseInt(newVal);
    
    if (num >= 1000){
        let new_num = Math.max(num, range[0]);
        new_num = Math.min(new_num, range[1]);
        onChange(new_num);
    }
  };

  return (
    <Input 
      type="text" // Use text to allow temporary empty states
      value={localValue}
      onChange={handleInputChange}
      className="w-20"
    />
  );
}