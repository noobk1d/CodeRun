import React from "react";
import { cn } from "../../lib/utils";

export const DotPattern = ({ className, glow = false }) => {
  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      <div
        className={cn(
          "absolute h-full w-full",
          glow &&
            "[mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
        )}>
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-100/[0.03]" />
        {glow && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-transparent to-blue-500/30 blur-2xl" />
        )}
      </div>
    </div>
  );
};
