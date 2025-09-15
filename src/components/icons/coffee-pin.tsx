import { cn } from "@/lib/utils";

export function CoffeePin({ isSelected }: { isSelected?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full transition-all",
        isSelected
          ? "bg-primary/20 scale-125"
          : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "absolute h-full w-full rounded-full border-2 ",
          isSelected ? "border-primary" : "border-card"
        )}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "h-5 w-5 transition-colors",
          isSelected ? "text-primary" : "text-foreground"
        )}
      >
        <path d="M17 8h-7a4 4 0 0 0-4 4 4 4 0 0 0 4 4h7" />
        <path d="M20 8v8" />
        <path d="M4 12H2" />
        <path d="M5 19v-2.34a4 4 0 0 1 4-4h7a4 4 0 0 1 4 4V19" />
      </svg>
    </div>
  );
}
