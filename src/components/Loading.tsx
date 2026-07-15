const LoadingRepositories = () =>  {
    return (
        <div className="flex-1 mt-11 p-8 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]">

            <div className="mb-5 flex justify-center items-center">
                <svg
                    className="animate-spin text-gray-900 w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-10"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>
            <div className="flex flex-col items-center animate-pulse">
                <h3 className="text-sm font-semibold text-gray-700 tracking-wide">
                    Loading Repositories
                </h3>
                <p className="text-xs font-medium text-gray-400 mt-1">
                    Fetching your latest code...
                </p>
            </div>

            <div className="mt-6 w-full max-w-40 space-y-2">
                <div className="h-1.5 bg-gray-100 rounded-full w-full animate-pulse" />
                <div
                    className="h-1.5 bg-gray-100 rounded-full w-4/5 mx-auto animate-pulse"
                    style={{ animationDelay: '150ms' }}
                />
                <div
                    className="h-1.5 bg-gray-50 rounded-full w-1/2 mx-auto animate-pulse"
                    style={{ animationDelay: '300ms' }}
                />
            </div>

        </div>
    );
}

export default LoadingRepositories