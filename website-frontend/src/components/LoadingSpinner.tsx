export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-muted rounded-full"></div>
        
        {/* Spinning Brand Element */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        
        {/* Pulsing Center dot (Optional, for that 'game' feel) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
}