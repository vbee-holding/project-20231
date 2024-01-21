const NotFound = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            We couldn't find the result
          </h1>
          <p className="text-sm max-w-xs mx-auto">
            Please double check your keyword
          </p>
        </div>
      </div>
    </div>
  );
};
export default NotFound