function NotFoundPage() {
  return (
    <div className="h-screen bg-[#121212] flex justify-center items-start text-white p-4 pt-10">
      <div className="flex flex-col text-left max-w-3xl w-full">
        <h1 className="text-5xl font-bold">Error</h1>
        <p className="mt-2 text-sm">
          Oops! Something went wrong. Please try again or check our{" "}
          <span className="cursor-pointer underline">help section</span>
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
