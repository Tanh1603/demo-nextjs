import { Loader2 } from "lucide-react";
import React from "react";

function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  );
}

export default LoadingSpinner;

