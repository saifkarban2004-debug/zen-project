// ScrollIndicator component

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center space-y-3 animate-pulse">
      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-medium">
        Scroll to Explore
      </span>
      <svg 
        width="14" 
        height="20" 
        viewBox="0 0 14 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-slate-600 animate-bounce"
      >
        <path 
          d="M7 1V19M7 19L1 13M7 19L13 13" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
